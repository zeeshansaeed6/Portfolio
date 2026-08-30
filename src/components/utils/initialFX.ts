import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  try {
    if (smoother && typeof smoother.paused === "function") {
      smoother.paused(false);
    }
  } catch (e) {
    console.warn("ScrollSmoother:", e);
  }

  const main = document.querySelector("main") || document.querySelector(".main-body");
  if (main) {
    main.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 0.5,
  });

  try {
    const introEl = document.querySelector(".landing-intro h1");
    if (introEl) {
      const landingText = new SplitText(
        [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
        {
          type: "chars,lines",
          linesClass: "split-line",
        }
      );
      gsap.fromTo(
        landingText.chars,
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0.3,
        }
      );
    }
  } catch (e) {
    console.warn("SplitText intro:", e);
  }

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  try {
    if (document.querySelector(".landing-h2-info")) {
      const landingText2 = new SplitText(".landing-h2-info", TextProps);
      const landingText3 = new SplitText(".landing-h2-info-1", TextProps);
      const landingText4 = new SplitText(".landing-h2-1", TextProps);
      const landingText5 = new SplitText(".landing-h2-2", TextProps);

      gsap.set([landingText3.chars, landingText5.chars], { opacity: 0 });

      gsap.fromTo(
        [landingText2.chars, landingText4.chars],
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0.3,
        }
      );

      LoopText(landingText2, landingText3);
      LoopText(landingText4, landingText5);
    }
  } catch (e) {
    console.warn("SplitText loop:", e);
  }

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}

function LoopText(Text1: SplitText, Text2: SplitText) {
  if (!Text1 || !Text2 || !Text1.chars || !Text2.chars) return;
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
