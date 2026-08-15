"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { textReveal, staggerReveal } from "@/lib/animations";
import { processSteps } from "@/lib/content";

export default function Process() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-process-heading]", { trigger: rootRef.current });
      staggerReveal("[data-process-step]", { trigger: listRef.current, stagger: 0.08, start: "top 80%" });

      gsap.fromTo(
        "[data-process-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        dotRef.current,
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-bg py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-accent">04 / PROCESS</span>
              <h2 className="font-display font-medium leading-[0.95] text-text" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
                <span className="block overflow-hidden pb-[0.15em]"><span data-process-heading className="block">From</span></span>
                <span className="block overflow-hidden pb-[0.15em]"><span data-process-heading className="block">Design</span></span>
                <span className="block overflow-hidden pb-[0.15em]"><span data-process-heading className="block text-muted">To Delivery.</span></span>
              </h2>
              <p className="mt-6 max-w-sm text-sm text-muted">
                Every job moves through the same disciplined workflow — from customer RFQ to tool buy-off — as set
                out in our engineering process.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div ref={listRef} className="relative pl-10 sm:pl-12">
              {/* connecting line track */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-text/10 sm:left-[9px]">
                <div data-process-line className="absolute inset-x-0 top-0 h-full w-full bg-accent" />
              </div>
              {/* moving dot */}
              <div ref={dotRef} className="absolute left-0 -ml-[6px] h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(29,111,255,0.7)] sm:-ml-[7px] sm:h-4 sm:w-4" />

              {processSteps.map((step) => (
                <div key={step.index} data-process-step className="relative flex items-baseline gap-4 border-b border-text/10 py-6 sm:py-7">
                  <span className="font-mono text-xs text-accent">{step.index}</span>
                  <h3 className="font-display text-xl text-text sm:text-2xl">{step.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
