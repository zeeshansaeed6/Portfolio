import { useEffect } from "react";
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  category: string;
  tools: string[];
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    name: "Aegis Ultimate",
    category: "Zero-Telemetry Browser & Search",
    tools: ["Electron", "Chromium", "Node.js", "BM25 Indexing", "Gemini API", "Ollama", "Tor", "Express.js"],
    description:
      "Sovereign zero-telemetry private search engine & Chromium desktop browser suite featuring sub-5ms BM25 local indexing, isolated multi-tab proxy browsing, cited AI synthesis, and instant tools.",
    image: "/images/aegis.jpg",
    link: "https://github.com/zeeshansaeed6/Aegis-Ultimate",
  },
  {
    name: "Standup Chief of Staff",
    category: "Voice AI & Alexa+ MCP Server",
    tools: ["Amazon Bedrock", "Model Context Protocol", "Alexa+", "TypeScript", "React 18", "Express.js"],
    description:
      "Voice-first developer chief of staff for Alexa+ powered by MCP and Amazon Bedrock (Nova Lite). Synthesizes spoken daily blocker briefings from GitHub PRs/CI builds and executes two-phase voice actions.",
    image: "/images/project-standup-chief.jpg",
    link: "https://github.com/zeeshansaeed6/Standup-Chief-of-Staff",
  },
  {
    name: "OmniMarket",
    category: "MERN Multi-Vendor Hub",
    tools: ["MERN Stack", "Stripe Escrow", "Multi-Currency", "Redux", "RBAC"],
    description:
      "Commercial-grade multi-vendor marketplace featuring Stripe 3D-secure escrow payments, item-level split vendor fulfillment, dynamic 9-currency conversion, and vendor management hubs.",
    image: "/images/project-omnimarket.jpg",
    link: "https://github.com/zeeshansaeed6/E-CommWeb",
  },
  {
    name: "SerpentAI Ultra",
    category: "Multimodal AI & HealthTech",
    tools: ["MERN Stack", "Gemini Vision AI", "WebRTC", "Geolocation API"],
    description:
      "Multimodal AI vision suite for real-time snake species identification, venom risk triage scoring, low-light photo enhancement, and auto-dispatched GPS antivenom hospital routing.",
    image: "/images/project-serpentai.jpg",
    link: "https://github.com/zeeshansaeed6/SerpentAI-",
  },
  {
    name: "My React App",
    category: "React & Automated DevOps",
    tools: ["React 18", "JavaScript", "GitHub CLI (gh)", "DevOps CI/CD", "Webpack"],
    description:
      "Modern high-performance React SPA built with automated CI/CD DevOps workflows, programmatic branch & PR management via GitHub CLI, and auditable deployment scripting.",
    image: "/images/project-react-devops.jpg",
    link: "https://github.com/zeeshansaeed6/my-app",
  },
  {
    name: "FoodDash",
    category: "Food Delivery & Social Dining",
    tools: ["Vite", "Node.js", "Express.js", "Three.js", "Split Billing"],
    description:
      "Next-generation food delivery platform blending e-commerce with social dining, gamification, and WebGL 3D graphics. Features AI dining intelligence and an immersive 3D food inspector.",
    image: "/images/project-fooddash.jpg",
    link: "https://github.com/zeeshansaeed6/FoodDash",
  },
  {
    name: "Brain Tumor Detection",
    category: "AI & Computer Vision",
    tools: ["Python", "TensorFlow", "OpenCV", "Plotly", "CNNs"],
    description:
      "Deep learning CNN model classifying MRI scans for tumor presence with iterative model tuning. OpenCV preprocessing for noise reduction and interactive metric dashboards.",
    image: "/images/project-braintumor.jpg",
    link: "https://github.com/zeeshansaeed6/BrainTumorDetection",
  },
  {
    name: "CollegeERP",
    category: "ERP & Automation",
    tools: ["MERN Stack", "Twilio API", "MongoDB", "Node.js"],
    description:
      "Centralized Educational Resource Planning system digitizing student records, attendance, and administrative operations with automated Twilio SMS alert integration.",
    image: "/images/project-collegeerp.jpg",
    link: "https://github.com/zeeshansaeed6/CollegeERP",
  },
];

const Work = () => {
  useEffect(() => {
    // Preload project images into browser memory cache for zero scroll latency
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });

    let cleanupTouch: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const workFlex = document.querySelector(".work-flex") as HTMLElement;
      if (!workFlex) return;

      const getTranslateX = () => {
        const totalWidth = workFlex.scrollWidth;
        const viewportWidth = window.innerWidth;
        const extraOffset = viewportWidth <= 1024 ? 40 : 80;
        return Math.max(0, totalWidth - viewportWidth + extraOffset);
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${getTranslateX()}`,
          scrub: 1,
          pin: true,
          id: "work",
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      timeline.to(".work-flex", {
        x: () => -getTranslateX(),
        ease: "none",
      });

      // Horizontal touch swipe support for mobile
      let startX = 0;
      let startY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          const deltaX = startX - e.touches[0].clientX;
          const deltaY = startY - e.touches[0].clientY;
          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 6) {
            window.scrollBy({ top: deltaX * 1.1, behavior: "auto" });
            startX = e.touches[0].clientX;
          }
        }
      };

      workFlex.addEventListener("touchstart", handleTouchStart, { passive: true });
      workFlex.addEventListener("touchmove", handleTouchMove, { passive: true });

      cleanupTouch = () => {
        workFlex.removeEventListener("touchstart", handleTouchStart);
        workFlex.removeEventListener("touchmove", handleTouchMove);
      };
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      if (cleanupTouch) cleanupTouch();
      ctx.revert();
    };
  }, []);

  return (
    <section className="work-section" id="work">
      <div className="work-header-wrap">
        <div className="work-header">
          <h2>
            My <span>Projects</span>
          </h2>
          <span className="work-header-count">
            {projects.length < 10 ? `0${projects.length}` : projects.length} FEATURED PROJECTS
          </span>
        </div>
      </div>

      <div className="work-track-wrapper">
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-card" key={index}>
              <div className="work-card-top">
                <span className="work-card-num">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                <span className="work-card-category">{project.category}</span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="work-card-link"
                    title={`View ${project.name}`}
                    data-cursor="disable"
                  >
                    <MdArrowOutward />
                  </a>
                )}
              </div>

              <div className="work-card-body">
                <h3 className="work-card-title">{project.name}</h3>
                <p className="work-card-desc">{project.description}</p>
                <div className="work-card-tags">
                  {project.tools.map((tool, tIdx) => (
                    <span className="work-tag" key={tIdx}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="work-card-media">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                  tabIndex={-1}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    width="400"
                    height="175"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
