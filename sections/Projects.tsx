"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { textReveal } from "@/lib/animations";
import { projectsGallery } from "@/lib/content";
import GalleryLightbox from "@/components/GalleryLightbox";

const aspects = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]"];

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projectsGallery.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? projectsGallery : projectsGallery.filter((p) => p.tags.includes(filter))),
    [filter]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-proj-heading]", { trigger: rootRef.current });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-proj-item]", { opacity: 0, y: 20, duration: 0.6, stagger: 0.05, ease: "power2.out" });
    }, rootRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <section id="projects" ref={rootRef} className="relative bg-bg py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-accent">10 / PROJECTS</span>
            <h1 className="font-display font-medium leading-[0.95] text-text" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
              <span className="block overflow-hidden pb-[0.15em]"><span data-proj-heading className="block">Selected</span></span>
              <span className="block overflow-hidden pb-[0.15em]"><span data-proj-heading className="block text-muted">Engineering Work.</span></span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                data-cursor="interactive"
                className={`border px-4 py-2 text-xs tracking-wide transition-colors ${
                  filter === c ? "border-accent bg-accent/10 text-accent" : "border-text/12 text-muted hover:border-text/30 hover:text-text"
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((item, i) => (
            <button
              key={item.title + i}
              data-proj-item
              onClick={() => setOpenIndex(i)}
              data-cursor="view"
              className={`group relative mb-4 block w-full overflow-hidden border border-text/10 text-left break-inside-avoid ${aspects[i % aspects.length]}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scrim/90 via-scrim/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 translate-y-1 p-4 transition-transform duration-500 group-hover:translate-y-0">
                <span className="block font-mono text-[10px] tracking-widest text-on-navy-blue">{item.category.toUpperCase()}</span>
                <span className="block font-display text-lg text-on-navy">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <GalleryLightbox items={filtered} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </section>
  );
}
