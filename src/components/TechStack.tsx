import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";

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
    name: "MongoDB",
    color: "#00ED64",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#00ED64" d="M64 4c-2 0-22 28-22 62 0 28 13 48 18 54 2 2 4 4 4 4s2-2 4-4c5-6 18-26 18-54C86 32 66 4 64 4z"/><path fill="#116149" d="M64 12v104c-1 0-8-12-11-20-4-10-7-22-7-34 0-24 12-42 18-50z"/></svg>`,
  },
  {
    name: "Docker",
    color: "#2496ED",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m21.605 1.954c-.402-.27-1.424-.46-2.316-.277-.144-.755-.662-1.396-1.328-1.748l-.403-.213-.263.364c-.496.69-.76 1.58-.76 2.553 0 .42.062.83.178 1.22-.44.22-.977.34-1.585.34H.576a.576.576 0 00-.576.576c0 1.25.26 2.45.748 3.522.656 1.442 1.69 2.65 2.97 3.497 1.574 1.042 3.47 1.607 5.485 1.607 6.782 0 12.355-4.802 13.064-11.23.013-.122.02-.244.02-.366 0-.61-.07-.98-.292-1.282l-.178-.225z"/></svg>`,
  },
  {
    name: "React",
    color: "#61DAFB",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.232 23 20.463"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="1.1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
  },
  {
    name: "SQL & MySQL",
    color: "#00758F",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="20" fill="#00758F"/><ellipse cx="64" cy="36" rx="44" ry="15" fill="#F29111" stroke="#ffffff" stroke-width="3"/><path d="M20 36v46c0 8 20 15 44 15s44-7 44-15V36" fill="none" stroke="#ffffff" stroke-width="4"/><path d="M20 60c0 8 20 15 44 15s44-7 44-15" fill="none" stroke="#ffffff" stroke-width="4"/><text x="64" y="118" fill="#ffffff" font-size="22" font-family="sans-serif" font-weight="900" text-anchor="middle">SQL</text></svg>`,
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="16" fill="#3178C6"/><path fill="#ffffff" d="M38 42h52v12H68v48H52V54H38V42zm48 24c6 0 12 2 16 5l-4 10c-3-2-8-4-12-4-5 0-8 2-8 5 0 8 26 4 26 21 0 12-10 19-24 19-8 0-16-3-20-6l5-10c4 3 10 5 15 5 6 0 9-3 9-6 0-9-26-5-26-21 0-11 9-18 23-18z"/></svg>`,
  },
];

function createBrandTexture(brand: TechBrand): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Dark ceramic ball background
  ctx.fillStyle = "#0c0a12";
  ctx.fillRect(0, 0, 1024, 512);

  const img = new Image();
  img.src = `data:image/svg+xml;utf8,${encodeURIComponent(brand.svg)}`;

  const render = () => {
    ctx.fillStyle = "#0c0a12";
    ctx.fillRect(0, 0, 1024, 512);

    [256, 768].forEach((cx) => {
      const cy = 256;

      // Color aura glow
      const grad = ctx.createRadialGradient(cx, cy - 10, 20, cx, cy - 10, 180);
      grad.addColorStop(0, brand.color + "55");
      grad.addColorStop(0.5, brand.color + "18");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 180, 0, Math.PI * 2);
      ctx.fill();

      // Dark badge plate
      ctx.fillStyle = "#16131e";
      ctx.strokeStyle = brand.color + "AA";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(cx, cy - 16, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw real SVG icon
      if (img.complete && img.naturalWidth !== 0) {
        const iconSize = 140;
        ctx.drawImage(img, cx - iconSize / 2, cy - iconSize / 2 - 16, iconSize, iconSize);
      }

      // Brand Label Text
      ctx.font = "900 30px Geist, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = brand.color;
      ctx.shadowBlur = 10;
      ctx.fillText(brand.name, cx, cy + 76);
      ctx.shadowBlur = 0;
    });
  };

  img.onload = () => {
    render();
    texture.needsUpdate = true;
  };

  render();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const sphereScales = [0.95, 1.05, 1.15, 0.9, 1.0, 1.1];
const spheres = [...Array(27)].map((_, i) => ({
  scale: sphereScales[i % sphereScales.length],
  brandIndex: i % techBrands.length,
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return;
    delta = Math.min(0.08, delta);

    const pos = api.current.translation();
    const distance = Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z);

    const pullForce = 35 * delta * scale;
    const impulse = vec
      .set(-pos.x, -pos.y * 1.1, -pos.z)
      .normalize()
      .multiplyScalar(pullForce * Math.min(distance, 8));

    api.current.applyImpulse(impulse, true);

    api.current.applyTorqueImpulse(
      new THREE.Vector3(
        0.0012 * scale,
        0.0025 * scale,
        0.0008 * scale
      ),
      true
    );
  });

  return (
    <RigidBody
      linearDamping={0.65}
      angularDamping={0.3}
      friction={0.2}
      restitution={0.7}
      position={[r(14), r(10), r(10) - 3]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.22
    );
    ref.current.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2.2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return techBrands.map((brand) => {
      const texture = createBrandTexture(brand);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        emissive: "#1e1a24",
        emissiveMap: texture,
        emissiveIntensity: 0.45,
        metalness: 0.15,
        roughness: 0.18,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.9,
      });
    });
  }, []);

  return (
    <div className="techstack">
      <div className="techstack-header">
        <h2>
          My <span>Tech Stack</span>
        </h2>
        <p className="techstack-subtitle">
          Interactive 3D Physics • Hover & bump to disperse core technologies
        </p>
      </div>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: true }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.45)}
        className="tech-canvas"
      >
        <ambientLight intensity={1.3} />
        <spotLight
          position={[20, 25, 25]}
          penumbra={1}
          angle={0.25}
          color="#ffffff"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[-10, 10, 10]} intensity={1.5} color="#e0d4ff" />
        <directionalLight position={[0, -10, -5]} intensity={1.0} color="#7f60f9" />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              material={materials[props.brandIndex]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.65}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0b080c" aoRadius={2} intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
