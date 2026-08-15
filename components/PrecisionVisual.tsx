"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: (i * 47) % 100,
  top: (i * 31 + 13) % 100,
  size: 2 + ((i * 7) % 4),
  delay: (i % 6) * 0.9,
  duration: 7 + (i % 5),
}));

const TECH_LABELS = [
  { text: "CNC // 5-AXIS", pos: "left-0 top-[8%]" },
  { text: "±0.01 MM", pos: "right-0 top-[6%]" },
  { text: "PRECISION // 01", pos: "left-0 bottom-[10%]" },
  { text: "ME-2026", pos: "right-0 bottom-[8%]" },
];

export default function PrecisionVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || window.matchMedia("(pointer: coarse)").matches) return;

    const movePlate = gsap.quickTo(plateRef.current, "x", { duration: 0.9, ease: "power3.out" });
    const movePlateY = gsap.quickTo(plateRef.current, "y", { duration: 0.9, ease: "power3.out" });
    const moveRing = gsap.quickTo(ringRef.current, "x", { duration: 1.2, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ringRef.current, "y", { duration: 1.2, ease: "power3.out" });
    const moveParticles = gsap.quickTo(particlesRef.current, "x", { duration: 1.6, ease: "power3.out" });
    const moveParticlesY = gsap.quickTo(particlesRef.current, "y", { duration: 1.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      movePlate(relX * 18);
      movePlateY(relY * 18);
      moveRing(relX * -10);
      moveRingY(relY * -10);
      moveParticles(relX * 30);
      moveParticlesY(relY * 30);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className="relative mx-auto aspect-square w-full max-w-[480px]" aria-hidden="true">
      {/* Blueprint grid backdrop */}
      <div className="tech-grid-navy absolute inset-0 rounded-full opacity-60 [mask-image:radial-gradient(circle,black_55%,transparent_75%)]" />

      {/* Dimension lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 480 480" fill="none">
        <g stroke="#3a4250" strokeWidth="1">
          <line x1="20" y1="240" x2="90" y2="240" />
          <line x1="20" y1="230" x2="20" y2="250" />
          <line x1="90" y1="230" x2="90" y2="250" />
          <line x1="390" y1="240" x2="460" y2="240" />
          <line x1="390" y1="230" x2="390" y2="250" />
          <line x1="460" y1="230" x2="460" y2="250" />
        </g>
        <text x="30" y="260" fill="#5b6b80" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
          128.40
        </text>
        <text x="400" y="260" fill="#5b6b80" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
          64.00
        </text>
      </svg>

      {/* Outer glowing rotating ring */}
      <div ref={ringRef} className="absolute inset-[6%]">
        <div className="animate-pulse-glow h-full w-full">
          <svg className="animate-spin-slow h-full w-full" viewBox="0 0 400 400" fill="none">
            <defs>
              <linearGradient id="ringGlow" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2f6feb" stopOpacity="0" />
                <stop offset="45%" stopColor="#5b9bff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2f6feb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="188" stroke="url(#ringGlow)" strokeWidth="1.5" />
          </svg>
        </div>
        <svg className="absolute inset-[6%] h-[88%] w-[88%] [animation-direction:reverse] animate-spin-slow" viewBox="0 0 340 340" fill="none">
          <circle cx="170" cy="170" r="158" stroke="#3a4250" strokeWidth="1" strokeDasharray="2 10" />
        </svg>
      </div>

      {/* Central machined plate */}
      <div ref={plateRef} className="absolute inset-[18%] overflow-hidden rounded-[20%] drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]">
        {/* Continuous scan sweep across the plate */}
        <div className="animate-scan pointer-events-none absolute inset-x-0 h-14 bg-gradient-to-b from-accent/0 via-accent/40 to-accent/0" />
        <svg className="h-full w-full" viewBox="0 0 280 280" fill="none">
          <defs>
            <linearGradient id="steelFace" x1="20" y1="20" x2="260" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9aa4b2" />
              <stop offset="45%" stopColor="#4b525c" />
              <stop offset="100%" stopColor="#1c1f24" />
            </linearGradient>
            <linearGradient id="bossFace" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c7ccd1" />
              <stop offset="100%" stopColor="#565c66" />
            </linearGradient>
            <radialGradient id="boltHole" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#3a3f47" />
              <stop offset="100%" stopColor="#0c0d0f" />
            </radialGradient>
          </defs>

          {/* Hex plate */}
          <polygon
            points="140,8 262,74 262,206 140,272 18,206 18,74"
            fill="url(#steelFace)"
            stroke="#5b9bff"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          {/* Inner bevel line */}
          <polygon
            points="140,28 244,84 244,196 140,252 36,196 36,84"
            fill="none"
            stroke="#0c0d0f"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />

          {/* Bolt holes */}
          <circle cx="70" cy="90" r="10" fill="url(#boltHole)" />
          <circle cx="210" cy="90" r="10" fill="url(#boltHole)" />
          <circle cx="70" cy="190" r="10" fill="url(#boltHole)" />
          <circle cx="210" cy="190" r="10" fill="url(#boltHole)" />

          {/* Groove arcs */}
          <path d="M90 60 A 100 100 0 0 1 190 60" stroke="#0c0d0f" strokeOpacity="0.3" strokeWidth="2" fill="none" />
          <path d="M90 220 A 100 100 0 0 0 190 220" stroke="#0c0d0f" strokeOpacity="0.3" strokeWidth="2" fill="none" />

          {/* Central boss */}
          <circle cx="140" cy="140" r="52" fill="url(#bossFace)" stroke="#0c0d0f" strokeOpacity="0.3" strokeWidth="1" />
          <circle cx="140" cy="140" r="52" fill="none" stroke="#5b9bff" strokeOpacity="0.4" strokeWidth="1" />
          <circle cx="140" cy="140" r="34" fill="#1c1f24" />
          <circle cx="140" cy="140" r="34" fill="none" stroke="#3a4250" strokeWidth="1" />
          <circle cx="140" cy="140" r="12" fill="#0c0d0f" />
        </svg>
      </div>

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute animate-float rounded-full bg-accent/70"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Technical labels */}
      {TECH_LABELS.map((label) => (
        <span
          key={label.text}
          className={`absolute ${label.pos} hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/50 sm:block`}
        >
          {label.text}
        </span>
      ))}

      {/* Live scan status */}
      <span className="absolute bottom-[-6%] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/50">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        Precision Scan Active
      </span>
    </div>
  );
}
