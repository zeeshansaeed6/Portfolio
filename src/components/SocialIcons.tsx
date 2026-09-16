import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const cleanups: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      let rafId: number | null = null;
      let mouseX = 0;
      let mouseY = 0;
      let currentX = 0;
      let currentY = 0;
      let isHovered = false;

      const updatePosition = () => {
        if (!isHovered) {
          currentX += (0 - currentX) * 0.15;
          currentY += (0 - currentY) * 0.15;
          link.style.setProperty("--siLeft", `${currentX}px`);
          link.style.setProperty("--siTop", `${currentY}px`);
          if (Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1) {
            link.style.setProperty("--siLeft", "0px");
            link.style.setProperty("--siTop", "0px");
            rafId = null;
            return;
          }
        } else {
          currentX += (mouseX - currentX) * 0.15;
          currentY += (mouseY - currentY) * 0.15;
          link.style.setProperty("--siLeft", `${currentX}px`);
          link.style.setProperty("--siTop", `${currentY}px`);
        }

        rafId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX = x * 0.4;
        mouseY = y * 0.4;
        isHovered = true;
        if (!rafId) {
          rafId = requestAnimationFrame(updatePosition);
        }
      };

      const onMouseLeave = () => {
        isHovered = false;
        if (!rafId) {
          rafId = requestAnimationFrame(updatePosition);
        }
      };

      elem.addEventListener("mousemove", onMouseMove, { passive: true });
      elem.addEventListener("mouseleave", onMouseLeave, { passive: true });

      cleanups.push(() => {
        if (rafId) cancelAnimationFrame(rafId);
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/zeeshansaeed6" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://leetcode.com/u/zeeshansaeed06/" target="_blank" rel="noreferrer" aria-label="LeetCode (Active)">
            <SiLeetcode />
          </a>
        </span>
        <span>
          <a href="mailto:saeedzeeshan2003@gmail.com" aria-label="Email">
            <MdOutlineEmail />
          </a>
        </span>
      </div>
      <a className="resume-button" href="mailto:saeedzeeshan2003@gmail.com?subject=Resume%20Request%20-%20Zeeshan%20Saeed">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
