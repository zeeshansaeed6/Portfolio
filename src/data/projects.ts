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
      "Private search engine and Chromium desktop browser that keeps your data on your machine: BM25 search in under 5 ms, isolated proxy tabs, AI answers that cite their sources, and built-in instant tools.",
    image: "/images/aegis.webp",
    link: "https://github.com/zeeshansaeed6/Aegis-Ultimate",
  },
  {
    name: "Standup Chief of Staff",
    category: "Voice AI & Alexa+ MCP Server",
    tools: ["Amazon Bedrock", "Model Context Protocol", "Alexa+", "TypeScript", "React 18", "Express.js"],
    description:
      "Voice assistant for developers on Alexa+, built with MCP and Amazon Bedrock (Nova Lite). Turns GitHub pull requests and CI builds into a spoken daily briefing of what's blocking you, and asks you to confirm before it acts on a voice command.",
    image: "/images/project-standup-chief.webp",
    link: "https://github.com/zeeshansaeed6/Standup-Chief-of-Staff",
  },
  {
    name: "IntentLock",
    category: "AI Agent & Fintech",
    tools: ["React", "TypeScript", "Express 5", "Airwallex API", "Zod", "Vitest"],
    description:
      "Purchase agent built for the Airwallex Agentic Banking Hackathon: an LLM proposes a purchase, deterministic code signs it as an HMAC contract, and a virtual card is issued that can pay for that purchase only. 60 passing tests.",
    image: "/images/project-intentlock.webp",
    link: "https://github.com/zeeshansaeed6/IntentLock",
  },
  {
    name: "OmniMarket",
    category: "MERN Multi-Vendor Hub",
    tools: ["MERN Stack", "Stripe Escrow", "Multi-Currency", "Redux", "RBAC"],
    description:
      "Multi-vendor marketplace with Stripe 3D Secure escrow payments, fulfilment split by item across vendors, prices in 9 currencies, and dashboards for vendors to manage their stores.",
    image: "/images/project-omnimarket.webp",
    link: "https://github.com/zeeshansaeed6/E-CommWeb",
  },
  {
    name: "Zoffice",
    category: "Offline Desktop Office Suite",
    tools: ["Electron", "React 19", "Vite", "SQLite"],
    description:
      "Offline-first desktop office suite for documents, spreadsheets and slides, with .docx, .xlsx and .pptx support. No accounts or telemetry, six languages including Hindi and Urdu, and WCAG 2.1 AA accessibility.",
    image: "/images/project-zoffice.webp",
    link: "https://github.com/zeeshansaeed6/Zoffice",
  },
  {
    name: "StockFlow",
    category: "Multi-Tenant SaaS Inventory",
    tools: ["React 18", "Vite", "Tailwind CSS", "Express", "MongoDB", "JWT"],
    description:
      "Multi-tenant inventory app where every organization's data is fully isolated: products, stock levels, suppliers, low-stock alerts, reports and a stock-movement history. Built as a 6-hour MVP, then extended.",
    image: "/images/project-stockflow.webp",
    link: "https://github.com/zeeshansaeed6/stockflow-inventory-mvp",
  },
  {
    name: "SerpentAI Ultra",
    category: "Multimodal AI & HealthTech",
    tools: ["MERN Stack", "Gemini Vision AI", "WebRTC", "Geolocation API"],
    description:
      "Identifies snake species from a photo in real time, scores the venom risk, enhances low-light photos, and uses GPS to route you to the nearest hospital with antivenom.",
    image: "/images/project-serpentai.webp",
    link: "https://github.com/zeeshansaeed6/SerpentAI-",
  },
  {
    name: "My React App",
    category: "React & Automated DevOps",
    tools: ["React 18", "JavaScript", "GitHub CLI (gh)", "DevOps CI/CD", "Webpack"],
    description:
      "React single-page app with an automated CI/CD pipeline: branches and pull requests are managed with the GitHub CLI, and deployments run from scripts that log every step.",
    image: "/images/project-react-devops.webp",
    link: "https://github.com/zeeshansaeed6/my-app",
  },
  {
    name: "FoodDash",
    category: "Food Delivery & Social Dining",
    tools: ["Vite", "Node.js", "Express.js", "Three.js", "Split Billing"],
    description:
      "Food delivery platform that adds social dining and gamification to ordering, with WebGL 3D graphics, AI dining suggestions, and a 3D viewer for inspecting dishes.",
    image: "/images/project-fooddash.webp",
    link: "https://github.com/zeeshansaeed6/FoodDash",
  },
  {
    name: "Healthcare Backend API",
    category: "REST API & Backend",
    tools: ["Django", "Django REST Framework", "PostgreSQL", "JWT", "Docker"],
    description:
      "REST API for a healthcare app: users manage their own patients and a shared list of doctors, and assign doctors to patients. JWT authentication, private patient records, and every endpoint protected by default.",
    image: "/images/project-whatbytes.webp",
    link: "https://github.com/zeeshansaeed6/whatbytes",
  },
  {
    name: "Brain Tumor Detection",
    category: "AI & Computer Vision",
    tools: ["Python", "TensorFlow", "OpenCV", "Plotly", "CNNs"],
    description:
      "CNN that classifies MRI scans for tumors, tuned over several training rounds, with OpenCV preprocessing to reduce noise and interactive dashboards for the model's metrics.",
    image: "/images/project-braintumor.webp",
    link: "https://github.com/zeeshansaeed6/BrainTumorDetection",
  },
  {
    name: "CollegeERP",
    category: "ERP & Automation",
    tools: ["MERN Stack", "Twilio API", "MongoDB", "Node.js"],
    description:
      "College management system that digitizes student records, attendance and admin work, and sends automatic SMS alerts through Twilio.",
    image: "/images/project-collegeerp.webp",
    link: "https://github.com/zeeshansaeed6/CollegeERP",
  },
];
