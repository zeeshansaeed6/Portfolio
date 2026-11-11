import { useEffect, useRef, useState } from "react";
import "./styles/TechStack.css";

interface TechBrand {
  name: string;
  color: string;
  svg: string;
}

const techBrands: TechBrand[] = [
  {
    name: "JavaScript",
    color: "#F7DF1E",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630"><rect width="630" height="630" rx="60" fill="#F7DF1E"/><path d="m165.32 525.88 47.9-29.07c11.08 19.38 21.05 34.61 44.58 34.61 22.7 0 37.1-9.14 37.1-44.3v-237.49h59.27v238.6c0 63.41-37.1 91.66-93.6 91.66-51.5 0-80.86-27.41-95.25-53.99m215.17-10.8 47.9-27.69c13.29 22.15 33.78 38.49 61.2 38.49 25.48 0 41.54-12.74 41.54-30.46 0-21.05-16.61-28.8-45.69-41.25l-15.51-6.64c-44.58-18.83-74.22-42.64-74.22-92.49 0-45.97 35.44-80.86 91.39-80.86 39.88 0 68.68 13.85 87.51 47.08l-44.3 28.52c-9.97-17.72-23.26-24.92-43.2-24.92-20.49 0-33.78 11.08-33.78 26.58 0 18.28 12.74 24.92 38.77 36l15.51 6.64c52.06 22.15 81.97 45.41 81.97 95.82 0 54.83-43.2 84.74-99.14 84.74-56.5 0-93.6-28.25-107.45-59.83" fill="#000000"/></svg>`,
  },
  {
    name: "Python",
    color: "#3776AB",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110"><path fill="#3776AB" d="M54.5 10c-13.4 0-22.3 5.8-22.3 17.1v12.4h22.9v3.4H22.3C10.9 42.9 0 52.8 0 66.2c0 13.3 9.4 23.3 22.3 23.3h7.2v-10.3c0-11.8 10.1-22.1 22.3-22.1h22.9V44.7c0-11.3-9.5-17.6-22.5-17.6h-4.7V10zm-11.4 6.8a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8z"/><path fill="#FFD438" d="M55.5 100c13.4 0 22.3-5.8 22.3-17.1V70.5H54.9v-3.4h32.8c11.4 0 22.3-9.9 22.3-23.3 0-13.3-9.4-23.3-22.3-23.3h-7.2v10.3c0 11.8-10.1 22.1-22.3 22.1H35.3v12.4c0 11.3 9.5 17.6 22.5 17.6h4.7V100zm11.4-6.8a3.9 3.9 0 1 1 0-7.8 3.9 3.9 0 0 1 0 7.8z"/></svg>`,
  },
  {
    name: "React.js",
    color: "#61DAFB",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.232 23 20.463"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1.1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
  },
  {
    name: "Node.js",
    color: "#5FA04E",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 288"><path fill="#5FA04E" d="M128 0 0 74v148l128 74 128-74V74L128 0zm103 210-103 59-103-59V92l103-59 103 59v118z"/><text x="128" y="160" fill="#ffffff" font-size="64" font-weight="900" font-family="sans-serif" text-anchor="middle">node</text></svg>`,
  },
  {
    name: "Express.js",
    color: "#E0E0E0",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 128"><rect width="256" height="128" rx="24" fill="#1C1B24" stroke="#ffffff" stroke-width="5"/><text x="128" y="78" fill="#ffffff" font-size="52" font-family="sans-serif" font-weight="900" text-anchor="middle" font-style="italic">express</text></svg>`,
  },
  {
    name: "FastAPI",
    color: "#05998B",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="56" fill="#05998B"/><path fill="#ffffff" d="M64 18 38 68h24l-6 42 34-52H66l6-40z"/></svg>`,
  },
  {
    name: "MongoDB",
    color: "#00ED64",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#00ED64" d="M64 4c-2 0-22 28-22 62 0 28 13 48 18 54 2 2 4 4 4 4s2-2 4-4c5-6 18-26 18-54C86 32 66 4 64 4z"/><path fill="#116149" d="M64 12v104c-1 0-8-12-11-20-4-10-7-22-7-34 0-24 12-42 18-50z"/></svg>`,
  },
  {
    name: "PostgreSQL",
    color: "#4F8FCB",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="#336791"/><path fill="#ffffff" d="M64 22c-18 0-30 9-30 24 0 10 4 16 8 22-1 8-3 18 0 24 2 5 7 6 9 2 2-4 1-12 2-18 3 1 7 1 11 0 1 6 0 14 2 18 2 4 7 3 9-2 3-6 1-16 0-24 4-6 8-12 8-22 0-15-12-24-29-24zm-9 18a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm18 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>`,
  },
  {
    name: "SQL",
    color: "#00758F",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#00758F"/><ellipse cx="64" cy="36" rx="44" ry="15" fill="#F29111" stroke="#ffffff" stroke-width="3"/><path d="M20 36v46c0 8 20 15 44 15s44-7 44-15V36" fill="none" stroke="#ffffff" stroke-width="4"/><path d="M20 60c0 8 20 15 44 15s44-7 44-15" fill="none" stroke="#ffffff" stroke-width="4"/><text x="64" y="118" fill="#ffffff" font-size="22" font-family="sans-serif" font-weight="900" text-anchor="middle">SQL</text></svg>`,
  },
  {
    name: "GenAI & LLM",
    color: "#A87CFF",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="64" r="58" fill="#1e1338" stroke="#a87cff" stroke-width="4"/><path fill="#a87cff" d="M64 24l8 24 24 8-24 8-8 24-8-24-24-8 24-8 8-24z"/><circle cx="96" cy="40" r="7" fill="#fb8dff"/><circle cx="36" cy="88" r="6" fill="#61dafb"/></svg>`,
  },
  {
    name: "TensorFlow",
    color: "#FF6F00",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#FF6F00" d="M64 12 16 39v27l48-27 48 27V39L64 12zm0 32L24 66v27l40-23V44zm40 22-16 9v27l16-9V66zM64 76l-16 9v27l16-9 16 9V85L64 76z"/></svg>`,
  },
  {
    name: "OpenCV",
    color: "#8DC63F",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><circle cx="64" cy="40" r="22" fill="#EE2A24"/><circle cx="64" cy="40" r="9" fill="#0c0a12"/><circle cx="42" cy="82" r="22" fill="#00AEEF"/><circle cx="42" cy="82" r="9" fill="#0c0a12"/><circle cx="86" cy="82" r="22" fill="#8DC63F"/><circle cx="86" cy="82" r="9" fill="#0c0a12"/></svg>`,
  },
  {
    name: "AWS Cloud",
    color: "#FF9900",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#232F3E"/><text x="64" y="68" fill="#FF9900" font-size="44" font-weight="900" font-family="sans-serif" text-anchor="middle">aws</text><path d="M30 84c20 12 48 12 68 0" stroke="#FF9900" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
  },
  {
    name: "Docker",
    color: "#2496ED",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m21.605 1.954c-.402-.27-1.424-.46-2.316-.277-.144-.755-.662-1.396-1.328-1.748l-.403-.213-.263.364c-.496.69-.76 1.58-.76 2.553 0 .42.062.83.178 1.22-.44.22-.977.34-1.585.34H.576a.576.576 0 00-.576.576c0 1.25.26 2.45.748 3.522.656 1.442 1.69 2.65 2.97 3.497 1.574 1.042 3.47 1.607 5.485 1.607 6.782 0 12.355-4.802 13.064-11.23.013-.122.02-.244.02-.366 0-.61-.07-.98-.292-1.282l-.178-.225z"/></svg>`,
  },
  {
    name: "C Language",
    color: "#659AD2",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#044F88"/><text x="64" y="86" fill="#ffffff" font-size="76" font-weight="900" font-family="sans-serif" text-anchor="middle">C</text></svg>`,
  },
  {
    name: "Git & GitHub",
    color: "#F05032",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#F05032"/><circle cx="44" cy="44" r="12" fill="#ffffff"/><circle cx="44" cy="84" r="12" fill="#ffffff"/><circle cx="84" cy="64" r="12" fill="#ffffff"/><path d="M44 44v40M44 64c20 0 40 0 40 0" stroke="#ffffff" stroke-width="7" fill="none"/></svg>`,
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="14" fill="#3178C6"/><path fill="#ffffff" d="M22 62h42v10H48v38H38V72H22V62zm50 40 6-8c4 4 9 6 14 6 5 0 8-2 8-5 0-4-4-5-11-8-8-3-14-7-14-15 0-8 7-14 17-14 7 0 12 2 17 6l-6 8c-4-3-8-5-12-5-4 0-7 2-7 4 0 4 4 5 11 8 9 3 14 7 14 15 0 9-8 15-18 15-8 0-14-3-19-7z"/></svg>`,
  },
  {
    name: "Supabase",
    color: "#3ECF8E",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#3ECF8E" d="M75 118c-3 4-10 1-10-4V76h46c6 0 9 7 5 11L75 118z"/><path fill="#249361" d="M53 10c3-4 10-1 10 4v38H17c-6 0-9-7-5-11L53 10z"/></svg>`,
  },
];

const groups = ["Languages", "Web & APIs", "Data", "AI & ML", "Cloud & Tools"] as const;
const groupOf: Record<string, (typeof groups)[number]> = {
  JavaScript: "Languages", Python: "Languages", TypeScript: "Languages", "C Language": "Languages",
  "React.js": "Web & APIs", "Node.js": "Web & APIs", "Express.js": "Web & APIs", FastAPI: "Web & APIs",
  MongoDB: "Data", PostgreSQL: "Data", SQL: "Data", Supabase: "Data",
  "GenAI & LLM": "AI & ML", TensorFlow: "AI & ML", OpenCV: "AI & ML",
  "AWS Cloud": "Cloud & Tools", Docker: "Cloud & Tools", "Git & GitHub": "Cloud & Tools",
};

const icon = (b: TechBrand) => `data:image/svg+xml;utf8,${encodeURIComponent(b.svg)}`;
const STEP = 2.6; // seconds each command block takes
const TYPE = 1.1; // seconds to type a command

const Prompt = () => (
  <span className="term-prompt">
    <b className="u">zeeshan</b>
    <i>@</i>
    <b className="h">portfolio</b>
    <i>:</i>
    <b className="p">~/stack</b>
    <i>$</i>
  </span>
);

const TechStack = () => {
  const [go, setGo] = useState(false);
  const [run, setRun] = useState(0);
  const [hovered, setHovered] = useState<TechBrand | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // start typing the first time the window scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="techstack" id="techstack">
      <div className="techstack-header">
        <h2>
          My <span>Tech Stack</span>
        </h2>
        <p className="techstack-subtitle">Everything I ship with, straight from the terminal</p>
      </div>

      <div className="term-wrap" ref={ref}>
        <div className="term-glow" />
        <div className="term">
          <div className="term-bar">
            <span className="dots">
              <i /> <i /> <i />
            </span>
            <span className="term-title">zeeshan@portfolio: ~/stack</span>
            <button
              type="button"
              data-cursor="disable"
              className="term-replay"
              onClick={() => {
                setGo(true);
                setRun((r) => r + 1);
              }}
              aria-label="Replay animation"
            >
              ↻ replay
            </button>
          </div>

          <div key={run} className={`term-body ${go ? "go" : ""}`}>
            <p className="term-comment"># {techBrands.length} technologies • {groups.length} domains • 0 errors</p>

            {groups.map((g, gi) => {
              const cmd = `stack --list "${g}"`;
              const start = 0.4 + gi * STEP;
              return (
                <div className="term-block" key={g}>
                  <div className="term-line">
                    <Prompt />
                    <span
                      className="cmd"
                      style={{ "--n": cmd.length, "--cd": `${start}s`, "--td": `${TYPE}s` } as React.CSSProperties}
                    >
                      {cmd}
                    </span>
                  </div>
                  <div className="term-out">
                    {techBrands
                      .filter((b) => groupOf[b.name] === g)
                      .map((b, i) => (
                        <button
                          key={b.name}
                          type="button"
                          data-cursor="disable"
                          className="term-chip"
                          style={{ "--c": b.color, "--d": `${start + TYPE + 0.1 + i * 0.12}s` } as React.CSSProperties}
                          onMouseEnter={() => setHovered(b)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(b)}
                          onBlur={() => setHovered(null)}
                        >
                          <img src={icon(b)} alt="" loading="lazy" draggable={false} />
                          {b.name}
                        </button>
                      ))}
                  </div>
                </div>
              );
            })}

            <div className="term-line term-final" style={{ "--d": `${0.4 + groups.length * STEP}s` } as React.CSSProperties}>
              <Prompt />
              <span className="term-caret" />
            </div>
          </div>

          <div className="term-status">
            <span>⎇ main</span>
            <span className="term-hover" style={{ color: hovered?.color }}>
              {hovered ? `→ ${hovered.name} · ${groupOf[hovered.name]}` : "✓ all systems ready"}
            </span>
            <span>{techBrands.length} loaded</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
