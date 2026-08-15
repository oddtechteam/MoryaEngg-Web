"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { textReveal, staggerReveal } from "@/lib/animations";
import { customers } from "@/lib/content";

export default function Customers() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-cust-heading]", { trigger: rootRef.current });
      staggerReveal("[data-cust-item]", { trigger: "[data-cust-list]", stagger: 0.06 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-bg-secondary py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-accent">11 / CUSTOMERS</span>
          <h2 className="font-display font-medium leading-[0.95] text-text" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            <span className="block overflow-hidden pb-[0.15em]"><span data-cust-heading className="block">Trusted By</span></span>
            <span className="block overflow-hidden pb-[0.15em]"><span data-cust-heading className="block text-muted">Industry.</span></span>
          </h2>
        </div>

        <div data-cust-list className="grid grid-cols-1 border-t border-text/10 sm:grid-cols-2 lg:grid-cols-3">
          {customers.map((name) => (
            <div
              key={name}
              data-cust-item
              className="group flex min-h-28 items-center border-b border-r-0 border-text/10 px-2 py-6 transition-colors hover:bg-surface/40 sm:border-r sm:px-6"
            >
              <span className="font-display text-lg text-muted transition-colors group-hover:text-text sm:text-xl">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
