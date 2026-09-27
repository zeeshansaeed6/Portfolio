import { useEffect, useState } from "react";
import { MdCheck, MdClose, MdContentCopy, MdOutlineEmail } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { EmailToastDetail } from "./utils/email";
import "./styles/EmailToast.css";

const EmailToast = () => {
  const [toastData, setToastData] = useState<EmailToastDetail | null>(null);
  const [copiedState, setCopiedState] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<EmailToastDetail>;
      setToastData(customEvent.detail);
      setCopiedState(customEvent.detail.copied);

      clearTimeout(timer);
      timer = setTimeout(() => {
        setToastData(null);
      }, 5000);
    };

    window.addEventListener("email-toast", handler);

    return () => {
      window.removeEventListener("email-toast", handler);
      clearTimeout(timer);
    };
  }, []);

  if (!toastData) return null;

  const handleCopyAgain = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(toastData.email).then(() => {
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2000);
      });
    }
  };

  return (
    <div className="email-toast-container" role="alert" aria-live="assertive">
      <div className="email-toast">
        <div className="email-toast-header">
          <div className="email-toast-title">
            <span className="email-toast-check-icon">
              <MdCheck />
            </span>
            <span>Email Ready to Contact</span>
          </div>
          <button
            className="email-toast-close"
            onClick={() => setToastData(null)}
            aria-label="Close notification"
          >
            <MdClose />
          </button>
        </div>

        <p className="email-toast-address">{toastData.email}</p>
        <p className="email-toast-status">
          {copiedState
            ? "Copied to your clipboard! Opening email composer..."
            : "Opening email composer..."}
        </p>

        <div className="email-toast-actions">
          <a
            href={toastData.gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="email-toast-btn email-toast-btn-primary"
            data-cursor="disable"
          >
            <SiGmail /> Open in Gmail
          </a>
          <a
            href={toastData.mailtoUrl}
            className="email-toast-btn email-toast-btn-secondary"
            data-cursor="disable"
          >
            <MdOutlineEmail /> Default Mail App
          </a>
          <button
            onClick={handleCopyAgain}
            className="email-toast-btn email-toast-btn-secondary"
            data-cursor="disable"
          >
            <MdContentCopy /> {copiedState ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="email-toast-progress"></div>
      </div>
    </div>
  );
};

export default EmailToast;
