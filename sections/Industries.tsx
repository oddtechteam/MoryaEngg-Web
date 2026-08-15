"use client";

import { useEffect, useRef } from "react";
import { Car, Wheat, Zap, Droplets, ArrowUpRight, type LucideIcon } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { textReveal, staggerReveal } from "@/lib/animations";

type Industry = {
  name: string;
  description: string;
  icon: LucideIcon;
};

const industries: Industry[] = [
  { name: "Automotive", description: "Components, tooling and fixtures for the automotive sector.", icon: Car },
  { name: "Agricultural", description: "Precision parts supporting agricultural machinery and equipment.", icon: Wheat },
  { name: "Electrical", description: "Engineering support for electrical and control system components.", icon: Zap },
  { name: "Hydraulic", description: "Checking gauges and components built for hydraulic systems.", icon: Droplets },
];

export default function Industries() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-ind-heading]", { trigger: rootRef.current });
      staggerReveal("[data-ind-row]", { trigger: "[data-ind-list]", stagger: 0.1, start: "top 85%" });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const moveHighlight = (i: number | null) => {
    const list = listRef.current;
    const highlight = highlightRef.current;
    if (!list || !highlight) return;
    if (i === null) {
      gsap.to(highlight, { opacity: 0, duration: 0.4, ease: "power2.out" });
      return;
    }
    const row = rowRefs.current[i];
    if (!row) return;
    const listRect = list.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    gsap.to(highlight, {
      opacity: 1,
      y: rowRect.top - listRect.top,
      height: rowRect.height,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <section ref={rootRef} className="relative bg-bg py-28 sm:py-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-accent">09 / Industries</span>
          <h2 className="font-display font-medium leading-[0.95] text-text" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            <span className="block overflow-hidden pb-[0.15em]"><span data-ind-heading className="block">Engineering Across</span></span>
            <span className="block overflow-hidden pb-[0.15em]"><span data-ind-heading className="block text-muted">Industries.</span></span>
          </h2>
        </div>

        <div
          ref={listRef}
          data-ind-list
          className="relative border-t border-line"
          onMouseLeave={() => moveHighlight(null)}
        >
          {/* Sliding highlight */}
          <div
            ref={highlightRef}
            className="pointer-events-none absolute inset-x-0 top-0 border-y border-accent/30 bg-accent/[0.04] opacity-0"
          />

          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                data-ind-row
                onMouseEnter={() => moveHighlight(i)}
                className="group relative flex cursor-default items-center justify-between gap-6 border-b border-line py-7 sm:py-9"
              >
                <div className="flex items-center gap-6 sm:gap-10">
                  <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-display font-normal leading-none text-text transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent"
                    style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
                  >
                    {industry.name}
                  </h3>
                </div>

                <div className="flex items-center gap-4 sm:gap-8">
                  <p className="hidden max-w-[220px] text-right text-sm text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
                    {industry.description}
                  </p>
                  <Icon
                    size={22}
                    strokeWidth={1.25}
                    className="hidden -rotate-6 text-muted opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:text-accent group-hover:opacity-100 sm:block"
                  />
                  <ArrowUpRight
                    size={20}
                    className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
