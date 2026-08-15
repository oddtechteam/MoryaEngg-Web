"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { textReveal, staggerReveal } from "@/lib/animations";
import { capabilities } from "@/lib/content";

export default function Capabilities() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-cap-heading]", { trigger: rootRef.current });
      staggerReveal("[data-cap-row]", { trigger: "[data-cap-list]", stagger: 0.06 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="capabilities" ref={rootRef} className="relative bg-bg py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-accent">02 / CAPABILITIES</span>
            <h1 className="font-display font-medium leading-[0.95] text-text" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
              <span className="block overflow-hidden pb-[0.15em]"><span data-cap-heading className="block">What We</span></span>
              <span className="block overflow-hidden pb-[0.15em]"><span data-cap-heading className="block text-muted">Engineer.</span></span>
            </h1>
          </div>
          <p className="max-w-xs text-sm text-muted">
            From design to delivery — the core disciplines behind every tool, fixture and component we build.
          </p>
        </div>

        <div data-cap-list className="border-t border-text/10">
          {capabilities.map((cap, i) => {
            const isActive = active === i;
            return (
              <div
                key={cap.title}
                data-cap-row
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                data-cursor="interactive"
                className="group relative flex cursor-pointer flex-col gap-4 border-b border-text/10 py-6 transition-colors sm:flex-row sm:items-center sm:gap-8 sm:py-8"
              >
                <span className="font-mono text-sm text-muted transition-colors group-hover:text-accent">{cap.index}</span>

                <h3
                  className={`font-display flex-1 text-2xl sm:text-4xl lg:text-5xl transition-all duration-500 ${
                    isActive ? "text-text translate-x-2 sm:translate-x-4" : "text-muted"
                  }`}
                >
                  {cap.title}
                </h3>

                <p className={`hidden max-w-sm text-sm text-muted transition-opacity duration-500 md:block ${isActive ? "opacity-100" : "opacity-0"}`}>
                  {cap.description}
                </p>

                {/* Image reveal panel */}
                <div
                  className={`pointer-events-none absolute right-4 top-1/2 z-10 hidden h-40 w-64 -translate-y-1/2 overflow-hidden border border-text/10 shadow-2xl transition-all duration-500 lg:block ${
                    isActive ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-6 scale-95"
                  }`}
                >
                  <Image src={cap.image} alt={cap.title} fill sizes="256px" className="object-cover" />
                </div>

                <ArrowUpRight
                  size={22}
                  className={`shrink-0 text-muted transition-all duration-500 group-hover:text-accent ${
                    isActive ? "rotate-45 text-accent" : ""
                  }`}
                />

                {/* Mobile image */}
                <div className="relative h-40 w-full overflow-hidden md:hidden">
                  <Image src={cap.image} alt={cap.title} fill sizes="100vw" className="object-cover" />
                </div>
                <p className="text-sm text-muted md:hidden">{cap.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
