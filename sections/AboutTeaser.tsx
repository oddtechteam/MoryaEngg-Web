"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { textReveal, staggerReveal, imageReveal, parallax } from "@/lib/animations";
import { aboutContent, heroStats } from "@/lib/content";
import CornerBrackets from "@/components/CornerBrackets";

const facts = [
  { value: "2019", label: "Established" },
  { value: "15+", label: "Yrs. Experience" },
  { value: "ISO 9001:2015", label: "Certified" },
];

export default function AboutTeaser() {
  const rootRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-at-heading]", { trigger: rootRef.current });
      staggerReveal("[data-at-p]", { trigger: rootRef.current, stagger: 0.1 });
      staggerReveal("[data-at-fact]", { trigger: "[data-at-facts]", stagger: 0.08 });
      imageReveal(imgWrapRef.current, imgRef.current, { trigger: imgWrapRef.current });
      parallax(imgRef.current, { trigger: rootRef.current!, amount: 10 });
      if (prefersReducedMotion()) {
        gsap.set("[data-corner]", { opacity: 1, scale: 1 });
      } else {
        gsap.from("[data-corner]", {
          opacity: 0,
          scale: 0.5,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: { trigger: imgWrapRef.current, start: "top 80%" },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div ref={imgWrapRef} className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-5">
            <div ref={imgRef} className="absolute inset-0 -top-[8%] h-[116%] w-full">
              <Image
                src="/images/company/precision-manufacturing.png"
                alt="CNC precision manufacturing at Morya Engineering Works"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-3xl border border-line" />
            <CornerBrackets color="var(--color-accent)" />
          </div>

          <div className="lg:col-span-7">
            <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-accent">01 / About Us</span>
            <h2 className="font-display font-semibold leading-[0.95] text-text" style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}>
              <span className="block overflow-hidden pb-[0.15em]"><span data-at-heading className="block">Engineering Built</span></span>
              <span className="block overflow-hidden pb-[0.15em]"><span data-at-heading className="block text-muted">From Experience.</span></span>
            </h2>

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted">
              <p data-at-p>{aboutContent.paragraphs[0]}</p>
              <p data-at-p>
                Founded by <span className="text-text">{aboutContent.founderName}</span>, the company brings{" "}
                {heroStats[1].value}
                {heroStats[1].suffix} years of hands-on experience in sheet metal press tools & fixtures to every
                project.
              </p>
            </div>

            <div data-at-facts className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {facts.map((fact) => (
                <div data-at-fact key={fact.label}>
                  <span className="block font-display text-lg text-text sm:text-xl">{fact.value}</span>
                  <span className="block text-xs text-muted">{fact.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              data-cursor="interactive"
              className="link-underline mt-8 inline-flex items-center gap-2 text-sm font-medium text-text"
            >
              Learn more about us <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
