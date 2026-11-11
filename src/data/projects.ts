export interface Project {
  name: string;
  category: string;
  tools: string[];
  description: string;
  image: string;
  link: string;
}

export const projects: Project[] = [
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
