"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/MagneticButton";
import PrecisionVisual from "@/components/PrecisionVisual";

const trustStrip = ["Precision", "Quality", "Reliability", "Engineering Excellence"];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-badge]", { opacity: 0, y: 14, duration: 0.7 }, 0.1)
        .from("[data-hero-line]", { yPercent: 110, opacity: 0, duration: 1, stagger: 0.1 }, 0.25)
        .from("[data-hero-sub]", { opacity: 0, y: 16, duration: 0.9 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 }, "-=0.5")
        .from(
          "[data-hero-visual]",
          { opacity: 0, scale: 0.85, duration: 1.1, ease: "power4.out" },
          "-=0.9"
        )
        .from("[data-hero-strip]", { opacity: 0, duration: 0.8 }, "-=0.3");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative overflow-hidden bg-[#0d0e10] pb-0 pt-28 sm:pt-36 lg:pt-44"
    >
      {/* Layered background depth */}
      <div className="animate-glow-drift pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(47,111,235,0.14),transparent)]" />
      <div className="tech-grid-navy pointer-events-none absolute inset-0 opacity-[0.12]" />

      <div className="relative mx-auto max-w-[1600px] px-5 pb-20 sm:px-8 sm:pb-28 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Text column — 45% */}
          <div className="lg:col-span-5">
            <span
              data-hero-badge
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-white/60"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              Precision Engineering · Advanced Manufacturing
            </span>

            <h1 className="font-display font-semibold leading-[1.05] text-white" style={{ fontSize: "clamp(2.5rem, 5.2vw, 4.5rem)" }}>
              <span className="block overflow-hidden pb-[0.15em]">
                <span data-hero-line className="block">Precision</span>
              </span>
              <span className="block overflow-hidden pb-[0.15em]">
                <span data-hero-line className="block">Engineering.</span>
              </span>
              <span className="block overflow-hidden pb-[0.15em]">
                <span data-hero-line className="block">Built for</span>
              </span>
              <span className="block overflow-hidden pb-[0.15em]">
                <span data-hero-line className="block bg-gradient-to-r from-accent via-[#7fb0ff] to-accent bg-clip-text text-transparent">
                  Performance.
                </span>
              </span>
            </h1>

            <p data-hero-sub className="mt-8 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg">
              Morya Engineering Works delivers precision-engineered components and manufacturing solutions built
              around quality, accuracy and reliability.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                as={Link}
                href="/capabilities"
                data-hero-cta
                data-cursor="interactive"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-white shadow-[0_0_0_0_rgba(47,111,235,0.5)] transition-all duration-300 hover:shadow-[0_0_30px_2px_rgba(47,111,235,0.45)] hover:-translate-y-0.5"
              >
                Explore Our Capabilities
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
              <MagneticButton
                as={Link}
                href="/contact"
                data-hero-cta
                data-cursor="interactive"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-accent/60 hover:text-white hover:shadow-[0_0_20px_0_rgba(47,111,235,0.25)]"
              >
                Contact Us
              </MagneticButton>
            </div>
          </div>

          {/* Visual column — 55% */}
          <div data-hero-visual className="lg:col-span-7">
            <PrecisionVisual />
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div data-hero-strip className="relative border-t border-white/10">
        <div className="mx-auto max-w-[1600px] px-5 py-6 sm:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center font-mono text-[11px] tracking-[0.2em] text-white/40 sm:justify-between">
            {trustStrip.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {item.toUpperCase()}
                {i < trustStrip.length - 1 && <span className="hidden text-white/20 sm:inline">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
