"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { textReveal, imageReveal, parallax, staggerReveal } from "@/lib/animations";
import { aboutContent } from "@/lib/content";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-about-heading]", { trigger: rootRef.current, stagger: 0.05 });
      staggerReveal("[data-about-p]", { trigger: rootRef.current, stagger: 0.12 });
      imageReveal(imgWrapRef.current, imgRef.current, { trigger: imgWrapRef.current });
      parallax(imgRef.current, { trigger: rootRef.current!, amount: 12 });
      staggerReveal("[data-timeline-item]", { trigger: "[data-timeline]", stagger: 0.15 });
      gsap.fromTo(
        "[data-timeline-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left",
          scrollTrigger: { trigger: "[data-timeline]", start: "top 85%", end: "bottom 60%", scrub: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative bg-bg py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left: large heading */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-accent">01 / ABOUT</span>
              <h1
                className="font-display font-medium leading-[0.95] text-text"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                <span className="block overflow-hidden pb-[0.15em]"><span data-about-heading className="block">Engineering</span></span>
                <span className="block overflow-hidden pb-[0.15em]"><span data-about-heading className="block text-muted">Built From</span></span>
                <span className="block overflow-hidden pb-[0.15em]"><span data-about-heading className="block">Experience.</span></span>
              </h1>
            </div>
          </div>

          {/* Right: story */}
          <div className="lg:col-span-7">
            <div ref={imgWrapRef} className="relative mb-10 aspect-[16/10] w-full overflow-hidden rounded-3xl" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
              <div ref={imgRef} className="absolute inset-0 -top-[8%] h-[116%] w-full">
                <Image
                  src="/images/company/factory-floor.png"
                  alt="Morya Engineering Works manufacturing floor"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 border border-text/10" />
              <span className="absolute bottom-3 left-3 bg-bg/80 px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted backdrop-blur-sm">
                SHOP FLOOR / BHOSARI MIDC
              </span>
            </div>

            <div className="flex flex-col gap-6 text-base sm:text-lg leading-relaxed text-muted">
              {aboutContent.paragraphs.map((p, i) => (
                <p key={i} data-about-p>
                  {i === 1 ? (
                    <>
                      The company was founded by <span className="text-text">{aboutContent.founderName}</span>
                      {p.split(aboutContent.founderName)[1]}
                    </>
                  ) : (
                    p
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div data-timeline className="relative mt-24 sm:mt-32">
          <div className="mb-8 flex items-baseline justify-between font-mono text-xs tracking-[0.2em] text-muted">
            <span data-timeline-item>2019</span>
            <span data-timeline-item>PRESENT</span>
          </div>
          <div className="relative h-px w-full bg-text/10">
            <div data-timeline-line className="absolute inset-y-0 left-0 h-px w-full bg-accent" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {["Foundation", "Tool Room Growth", "Multi-Industry Clients", "ISO 9001:2015"].map((label) => (
              <div key={label} data-timeline-item className="border-l border-text/10 pl-3">
                <span className="text-xs uppercase tracking-wide text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
