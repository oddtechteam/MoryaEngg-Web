"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { textReveal, staggerReveal } from "@/lib/animations";
import { exploreItems } from "@/lib/explore";

export default function ExploreGrid() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-explore-heading]", { trigger: rootRef.current });
      staggerReveal("[data-explore-row]", { trigger: "[data-explore-list]", stagger: 0.08 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-bg py-16 sm:py-20">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <span className="mb-3 block font-mono text-xs tracking-[0.3em] text-accent">Explore</span>
          <h2 className="font-display font-semibold leading-[1.05] text-text" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}>
            <span className="block overflow-hidden pb-[0.15em]"><span data-explore-heading className="block">A full-service</span></span>
            <span className="block overflow-hidden pb-[0.15em]"><span data-explore-heading className="block text-accent">engineering partner.</span></span>
          </h2>
        </div>

        <div data-explore-list className="border-t border-line">
          {exploreItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-explore-row
                data-cursor="interactive"
                className="group relative flex items-center justify-between overflow-hidden border-b border-line py-5 pl-2 pr-4 sm:py-7 sm:pl-4 sm:pr-6"
              >
                {/* Bold color sweep fill */}
                <span className="absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-x-100" />

                <span className="relative flex items-center gap-4 sm:gap-8">
                  <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-on-navy-blue sm:text-sm">
                    {item.index}
                  </span>
                  <span
                    className="font-display uppercase leading-none text-text transition-all duration-300 group-hover:translate-x-2 group-hover:text-on-navy"
                    style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)" }}
                  >
                    {item.title}
                  </span>
                </span>

                <span className="relative flex items-center gap-4 sm:gap-8">
                  <span className="hidden font-mono text-[10px] tracking-widest text-muted transition-colors duration-300 group-hover:text-on-navy-muted sm:block">
                    {item.category.toUpperCase()}
                  </span>
                  <Icon size={20} className="hidden text-muted transition-colors duration-300 group-hover:text-accent sm:block" />
                  <ArrowUpRight
                    size={22}
                    className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
