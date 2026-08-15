"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { textReveal, staggerReveal } from "@/lib/animations";
import { toolDieGallery } from "@/lib/content";

export default function ToolDie() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-td-heading]", { trigger: rootRef.current });
      staggerReveal("[data-td-item]", { trigger: "[data-td-track]", stagger: 0.1 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-bg py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="font-display font-medium leading-[0.95] text-text" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-accent normal-case">06 / TOOL &amp; DIE</span>
            <span className="block overflow-hidden pb-[0.15em]"><span data-td-heading className="block">Tools That</span></span>
            <span className="block overflow-hidden pb-[0.15em]"><span data-td-heading className="block text-muted">Shape Production.</span></span>
          </h2>
          <p className="max-w-sm text-sm text-muted">
            Stage tools, forming tools and sheet metal press tools developed through our in-house tool room
            engineering process.
          </p>
        </div>
      </div>

      <div
        data-td-track
        className="flex gap-4 overflow-x-auto px-5 pb-4 snap-x snap-mandatory sm:px-8"
        style={{ scrollbarWidth: "none" }}
      >
        {toolDieGallery.map((item, i) => (
          <div
            key={item.title + i}
            data-td-item
            data-cursor="view"
            className="group relative h-[60vh] w-[85vw] shrink-0 snap-start overflow-hidden border border-text/10 sm:w-[55vw] lg:h-[70vh] lg:w-[38vw]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 38vw, 85vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/20 to-transparent" />
            <span className="absolute left-5 top-5 font-display text-6xl text-on-navy/15 sm:text-7xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <span className="mb-2 block font-mono text-[10px] tracking-widest text-on-navy-blue">{item.category.toUpperCase()}</span>
              <h3 className="font-display text-2xl text-on-navy sm:text-3xl">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
