"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Drill, Bolt, Zap, type LucideIcon } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { textReveal, staggerReveal } from "@/lib/animations";
import { machines } from "@/lib/content";

const machineIcons: Record<string, LucideIcon> = {
  Drilling: Drill,
  Tapping: Bolt,
  Wire: Zap,
};

function iconFor(name: string): LucideIcon | null {
  const key = Object.keys(machineIcons).find((k) => name.includes(k));
  return key ? machineIcons[key] : null;
}

export default function Machines() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-machines-heading]", { trigger: rootRef.current });
      staggerReveal("[data-machine-panel]", { trigger: "[data-machine-panels]", stagger: 0.08 });
      staggerReveal("[data-machine-card]", { trigger: "[data-machine-cards]", stagger: 0.08 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="machines" ref={rootRef} className="relative overflow-hidden bg-bg-secondary py-28 sm:py-36">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-[0.35]" />

      {/* Decorative rotating technical ring */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="animate-spin-slow pointer-events-none absolute right-[4%] top-[8%] hidden h-40 w-40 opacity-[0.35] sm:block lg:h-56 lg:w-56"
      >
        <circle cx="100" cy="100" r="94" fill="none" stroke="var(--color-accent)" strokeWidth="0.75" strokeDasharray="1 9" />
        <circle cx="100" cy="100" r="72" fill="none" stroke="var(--color-muted)" strokeWidth="0.5" />
      </svg>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <span className="mb-4 flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
          03 / Machines
        </span>
        <h1 className="mb-14 font-display font-medium leading-[1.05] text-text" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
          <span className="block overflow-hidden pb-[0.15em]"><span data-machines-heading className="block">The machines</span></span>
          <span className="block overflow-hidden pb-[0.15em]"><span data-machines-heading className="block text-muted">behind the work.</span></span>
        </h1>

        {/* Expanding panel gallery — desktop */}
        <div data-machine-panels className="hidden gap-3 lg:flex lg:h-[64vh]">
          {machines.map((m, i) => {
            const isActive = active === i;
            const hasPhoto = m.images.length > 0;
            const Icon = iconFor(m.name);
            return (
              <button
                key={m.index}
                data-machine-panel
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-label={`${m.name} — ${m.category}`}
                className="group relative h-full overflow-hidden rounded-3xl text-left transition-[flex-basis] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ flexBasis: isActive ? "36%" : `${64 / (machines.length - 1)}%`, flexGrow: 0, flexShrink: 0 }}
              >
                {hasPhoto ? (
                  <Image
                    src={m.images[0]}
                    alt={`${m.name} — ${m.category}`}
                    fill
                    sizes="36vw"
                    className={`object-cover transition-all duration-700 ${isActive ? "scale-100 grayscale-0" : "scale-110 grayscale"}`}
                  />
                ) : (
                  <div className="absolute inset-0 bg-navy">
                    <div className="tech-grid-navy absolute inset-0 opacity-40" />
                    {Icon && (
                      <Icon
                        strokeWidth={0.6}
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-on-navy transition-all duration-700 ${
                          isActive ? "h-16 w-16 opacity-20" : "h-24 w-24 opacity-10"
                        }`}
                      />
                    )}
                  </div>
                )}
                <div
                  className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 ${
                    isActive ? "from-scrim/90 via-scrim/20 to-transparent" : "from-scrim/80 via-scrim/50 to-scrim/20"
                  }`}
                />

                {/* Continuous scan sweep on the active panel */}
                {isActive && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="animate-scan absolute inset-x-0 h-20 bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0" />
                  </div>
                )}

                <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-navy/80 px-3 py-1.5 font-mono text-[10px] tracking-widest text-on-navy backdrop-blur-sm">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {m.index}
                </span>

                {/* Collapsed label — vertical */}
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="rotate-90 whitespace-nowrap font-display text-lg text-on-navy/80">{m.name}</span>
                </span>

                {/* Expanded detail */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ${
                    isActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <span className="font-mono text-xs tracking-widest text-accent">{m.category.toUpperCase()}</span>
                  <h3 className="mt-1 font-display text-2xl text-on-navy xl:text-3xl">{m.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-on-navy-muted">{m.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stacked cards — mobile / tablet */}
        <div data-machine-cards className="flex flex-col gap-5 lg:hidden">
          {machines.map((m) => {
            const hasPhoto = m.images.length > 0;
            const Icon = iconFor(m.name);
            return (
              <div key={m.index} data-machine-card className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-navy">
                {hasPhoto ? (
                  <Image src={m.images[0]} alt={`${m.name} — ${m.category}`} fill sizes="100vw" className="object-cover" />
                ) : (
                  <>
                    <div className="tech-grid-navy absolute inset-0 opacity-40" />
                    {Icon && <Icon strokeWidth={0.6} className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-on-navy opacity-15" />}
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-scrim/85 via-scrim/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1.5 font-mono text-[10px] tracking-widest text-on-navy backdrop-blur-sm">
                  {m.index} · {m.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-xl text-on-navy">{m.name}</h3>
                  <p className="mt-1 text-sm text-on-navy-muted">{m.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
