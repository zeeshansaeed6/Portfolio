import { useEffect } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Aegis Ultimate",
    category: "Zero-Telemetry Browser & Search",
    tools: "Electron, Chromium, Node.js, BM25 Indexing, Gemini API, Ollama, Tor",
    description:
      "Sovereign zero-telemetry private search engine & Chromium desktop browser suite featuring sub-5ms BM25 local indexing, isolated multi-tab proxy browsing, Perplexity-style cited AI synthesis, autonomous web crawler studio, and Google-parity instant tools.",
    image: "/images/aegis.png",
    link: "https://github.com/zeeshansaeed6/Aegis-Ultimate",
  },
  {
    name: "OmniMarket",
    category: "MERN Multi-Vendor Hub",
    tools: "MERN Stack, Stripe Escrow, Multi-Currency, Redux, RBAC",
    description:
      "Commercial-grade multi-vendor marketplace featuring Stripe 3D-secure escrow payments, item-level split vendor fulfillment, dynamic 9-currency conversion, and dedicated vendor & admin management hubs.",
    image: "/images/react.webp",
    link: "https://github.com/zeeshansaeed6/E-CommWeb",
  },
  {
    name: "SerpentAI Ultra",
    category: "Multimodal AI & HealthTech",
    tools: "MERN Stack, Gemini Vision AI, WebRTC, Geolocation API",
    description:
      "Multimodal AI vision suite for real-time snake species identification, venom risk triage scoring, low-light photo enhancement, and auto-dispatched GPS antivenom hospital routing.",
    image: "/images/node.webp",
    link: "https://github.com/zeeshansaeed6/snake-species-detection",
  },
  {
    name: "FoodDash",
    category: "Food Delivery & Social Dining",
    tools: "Vite, Vanilla JS, Node.js, Express.js, Three.js",
    description:
      "Next-generation food delivery platform blending e-commerce with social media, gamification, and WebGL 3D graphics. Features AI-powered dining intelligence and an immersive 3D food inspector.",
    image: "/images/react.webp",
    link: "https://github.com/zeeshansaeed6/FoodDash",
  },
  {
    name: "Brain Tumor Detection",
    category: "AI & Computer Vision",
    tools: "Python, TensorFlow, OpenCV, Plotly",
    description:
      "CNN model classifying MRI scans for tumor presence with iterative model tuning. OpenCV preprocessing for noise reduction and interactive Plotly metric visualizations.",
    image: "/images/node2.webp",
    link: "https://github.com",
  },
  {
    name: "CollegeERP",
    category: "ERP & Automation",
    tools: "MERN Stack, Twilio API, MongoDB, Node.js",
    description:
      "Centralized Educational Resource Planning system digitizing student records, attendance, and administrative operations with automated Twilio SMS alert integration.",
    image: "/images/mongo.webp",
    link: "https://github.com",
  },
  {
    name: "Generative AI Suite",
    category: "LLMs & Smart UX",
    tools: "Generative AI, LLMs, FastAPI, React, Supabase",
    description:
      "Intelligent application suite integrating LLMs and generative AI tools to power context-aware user workflows with scalable system architecture.",
    image: "/images/express.webp",
    link: "https://github.com",
  },
  {
    name: "Data Analytics Engine",
    category: "Analytics & Systems",
    tools: "Python, Pandas, NumPy, Plotly, AWS",
    description:
      "Production-style analytics pipeline and interactive dashboards from enterprise case studies, optimized for high data throughput and actionable insights.",
    image: "/images/javascript.webp",
    link: "https://github.com",
  },
];

const Work = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      let translateX: number = 0;

      function setTranslateX() {
        const box = document.getElementsByClassName("work-box");
        if (!box || box.length === 0) return;
        const workContainer = document.querySelector(".work-container");
        if (!workContainer) return;
        const rectLeft = workContainer.getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
        let padding: number =
          parseInt(window.getComputedStyle(box[0]).padding) / 2;
        translateX =
          rect.width * box.length - (rectLeft + parentWidth) + padding;
      }

      setTranslateX();

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${translateX}`,
          scrub: true,
          pin: true,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: () => -translateX,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Projects</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{index + 1 < 10 ? `0${index + 1}` : index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools & Features</h4>
                <p>{project.tools}</p>
                <p className="work-desc">{project.description}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
