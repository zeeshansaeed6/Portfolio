import { useEffect, useRef } from "react";
import "./styles/HeroProfile.css";
import { useLoading } from "../context/LoadingProvider";
import { setProgress } from "./Loading";
import { setHeroImageTimeline, setAllTimeline } from "./utils/GsapScroll";

const HeroProfile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    // 1. Loading sequence
    const progress = setProgress((value) => setLoading(value));

    const img = new Image();
    img.src = "/images/profile.png";

    const onImageReady = () => {
      progress.loaded().then(() => {
        setTimeout(() => {
          setHeroImageTimeline();
          setAllTimeline();
        }, 150);
      });
    };

    if (img.complete) {
      onImageReady();
    } else {
      img.onload = onImageReady;
      img.onerror = () => {
        progress.clear();
        setHeroImageTimeline();
        setAllTimeline();
      };
    }

    // 2. Interactive 3D Perspective Tilt on Mouse Movement
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinate from -1 to 1 relative to center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) / centerX;
      targetY = (e.clientY - centerY) / centerY;
    };

    const animateTilt = () => {
      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;

      if (imgRef.current) {
        const rotateY = currentX * 9; // subtle left-right rotation
        const rotateX = -currentY * 7; // subtle up-down rotation
        const translateX = currentX * 10 + 10; // includes 10px optical centering
        const translateY = currentY * 6;
        imgRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 15px)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(calc(-50% + ${currentX * 18}px), calc(-50% + ${currentY * 14}px)) scale(1.04)`;
      }

      if (rimRef.current) {
        rimRef.current.style.transform = `translate(calc(-50% + ${currentX * 12}px), calc(-50% + ${currentY * 10}px)) scale(1.02)`;
      }

      rafId = requestAnimationFrame(animateTilt);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateTilt);

    // Also trigger on resize to refresh timelines
    const handleResize = () => {
      setHeroImageTimeline();
      setAllTimeline();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [setLoading]);

  return (
    <div className="hero-profile-container" ref={containerRef}>
      {/* Profile Photo Wrapper */}
      <div className="hero-profile-photo-wrapper">
        {/* Dynamic Ambient Neon Aura directly behind subject */}
        <div className="hero-profile-glow" ref={glowRef}></div>
        <div className="hero-profile-rim" ref={rimRef}></div>

        <img
          ref={imgRef}
          src="/images/profile.png"
          alt="Zeeshan Saeed"
          className="hero-profile-img"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Soft bottom blend into the dark canvas */}
        <div className="hero-profile-fade"></div>
      </div>
    </div>
  );
};

export default HeroProfile;
