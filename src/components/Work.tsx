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
    image: "/images/aegis.png",
    link: "https://github.com/zeeshansaeed6/Aegis-Ultimate",
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
    link: "https://github.com/zeeshansaeed6/snake-species-detection",
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
    link: "https://github.com",
  },
  {
    name: "CollegeERP",
    category: "ERP & Automation",
    tools: ["MERN Stack", "Twilio API", "MongoDB", "Node.js"],
    description:
      "Centralized Educational Resource Planning system digitizing student records, attendance, and administrative operations with automated Twilio SMS alert integration.",
    image: "/images/project-collegeerp.jpg",
    link: "https://github.com",
  },
  {
    name: "Generative AI Suite",
    category: "LLMs & Smart UX",
    tools: ["Generative AI", "LLMs", "FastAPI", "React", "Supabase"],
    description:
      "Intelligent application suite integrating LLMs and generative AI tools to power context-aware user workflows with scalable system architecture and streaming responses.",
    image: "/images/project-genai.jpg",
    link: "https://github.com",
  },
  {
    name: "Data Analytics Engine",
    category: "Analytics & Systems",
    tools: ["Python", "Pandas", "NumPy", "Plotly", "AWS"],
    description:
      "Production-style analytics pipeline and interactive dashboards from enterprise case studies, optimized for high data throughput and actionable executive insights.",
    image: "/images/project-analytics.jpg",
    link: "https://github.com",
  },
];

const Work = () => {
  useEffect(() => {
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
          <span className="work-header-count">08 FEATURED PROJECTS</span>
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
                    loading="lazy"
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
