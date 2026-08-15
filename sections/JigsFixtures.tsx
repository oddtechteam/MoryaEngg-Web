"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { textReveal, staggerReveal } from "@/lib/animations";
import { jigsFixturesGallery } from "@/lib/content";
import GalleryLightbox from "@/components/GalleryLightbox";

const spanClasses = ["lg:row-span-2", "", "", "lg:row-span-2", ""];

export default function JigsFixtures() {
  const rootRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-jf-heading]", { trigger: rootRef.current });
      staggerReveal("[data-jf-item]", { trigger: "[data-jf-grid]", stagger: 0.08 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-bg-secondary py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-accent">05 / JIGS &amp; FIXTURES</span>
          <h2 className="font-display font-medium leading-[0.95] text-text" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            <span className="block overflow-hidden pb-[0.15em]"><span data-jf-heading className="block">Fixture</span></span>
            <span className="block overflow-hidden pb-[0.15em]"><span data-jf-heading className="block text-muted">Engineering.</span></span>
          </h2>
        </div>

        <div data-jf-grid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[220px]">
          {jigsFixturesGallery.map((item, i) => (
            <button
              key={item.title + i}
              data-jf-item
              onClick={() => setOpenIndex(i)}
              data-cursor="view"
              className={`group relative block h-64 w-full overflow-hidden border border-text/10 text-left lg:h-auto ${spanClasses[i % spanClasses.length]}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scrim/90 via-scrim/15 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 tech-grid-fine-navy opacity-0 transition-opacity duration-500 group-hover:opacity-30" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-5">
                <div className="translate-y-2 opacity-90 transition-transform duration-500 group-hover:translate-y-0">
                  <span className="block font-mono text-[10px] tracking-widest text-on-navy-blue">{item.category.toUpperCase()}</span>
                  <span className="block font-display text-lg text-on-navy sm:text-xl">{item.title}</span>
                </div>
                <ArrowUpRight size={18} className="shrink-0 text-on-navy opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <GalleryLightbox
        items={jigsFixturesGallery}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
