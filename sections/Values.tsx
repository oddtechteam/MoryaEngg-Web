"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { textReveal, staggerReveal } from "@/lib/animations";
import { missionPrinciples } from "@/lib/content";

const highlights = [
  "organization against which others are measured",
  "continually endeavor for excellence",
  "highest quality",
  "honesty, integrity & customer satisfaction",
];

function Principle({ text, highlight }: { text: string; highlight: string }) {
  const idx = text.indexOf(highlight);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-on-navy-blue">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
}

export default function Values() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-values-heading]", { trigger: rootRef.current });
      staggerReveal("[data-value-item]", { trigger: "[data-values-list]", stagger: 0.15 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-navy py-28 sm:py-36">
      <div className="tech-grid-navy pointer-events-none absolute inset-0 opacity-15" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-0 select-none whitespace-nowrap font-display text-[22vw] font-semibold leading-none text-on-navy/[0.04] sm:text-[16vw]"
      >
        Principles
      </span>

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-on-navy-blue">08 / Principles</span>
        <h2 className="mb-16 max-w-2xl font-display font-medium leading-[1.1] text-on-navy" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}>
          <span className="block overflow-hidden pb-[0.15em]"><span data-values-heading className="block">Built on</span></span>
          <span className="block overflow-hidden pb-[0.15em]"><span data-values-heading className="block text-gold">discipline.</span></span>
        </h2>

        <div data-values-list className="flex flex-col">
          {missionPrinciples.map((principle, i) => (
            <div key={i} data-value-item className="flex gap-6 border-t border-on-navy-line py-8 last:border-b sm:gap-10">
              <span className="font-mono text-sm text-on-navy-blue">{String(i + 1).padStart(2, "0")}</span>
              <p className="max-w-3xl text-xl leading-relaxed text-on-navy-muted sm:text-2xl">
                <Principle text={principle} highlight={highlights[i]} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
