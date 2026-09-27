export const EMAIL_ADDRESS = "saeedzeeshan2003@gmail.com";

export interface EmailToastDetail {
  email: string;
  gmailUrl: string;
  mailtoUrl: string;
  copied: boolean;
}

export const dispatchEmailToast = (detail: EmailToastDetail) => {
  const event = new CustomEvent<EmailToastDetail>("email-toast", { detail });
  window.dispatchEvent(event);
};

export const handleEmailClick = (
  e?: React.MouseEvent,
  subject?: string
) => {
  if (e) {
    e.preventDefault();
  }

  const encodedSubject = subject ? encodeURIComponent(subject) : "";
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}${
    encodedSubject ? `&su=${encodedSubject}` : ""
  }`;
  const mailtoUrl = `mailto:${EMAIL_ADDRESS}${
    encodedSubject ? `?subject=${encodedSubject}` : ""
  }`;

  if (navigator?.clipboard?.writeText) {
    navigator.clipboard
      .writeText(EMAIL_ADDRESS)
      .then(() => {
        dispatchEmailToast({
          email: EMAIL_ADDRESS,
          gmailUrl,
          mailtoUrl,
          copied: true,
        });
      })
      .catch(() => {
        dispatchEmailToast({
          email: EMAIL_ADDRESS,
          gmailUrl,
          mailtoUrl,
          copied: false,
        });
      });
  } else {
    dispatchEmailToast({
      email: EMAIL_ADDRESS,
      gmailUrl,
      mailtoUrl,
      copied: false,
    });
  }

  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    // Mobile browsers natively handle mailto links
    window.location.href = mailtoUrl;
  } else {
    // On desktop, open Gmail composer in a new tab
    const newWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      window.location.href = mailtoUrl;
    }
  }
};
