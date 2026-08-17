"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import MagneticButton from "@/components/MagneticButton";
import CornerBrackets from "@/components/CornerBrackets";

const trustStrip = ["Precision", "Quality", "Reliability", "Engineering Excellence"];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      gsap.set(
        ["[data-hero-badge]", "[data-hero-line]", "[data-hero-sub]", "[data-hero-cta]", "[data-hero-visual]", "[data-hero-strip]"],
        { clearProps: "all" }
      );
      gsap.set(imgWrapRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(imgRef.current, { scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-badge]", { opacity: 0, y: 14, duration: 0.7 }, 0.1)
        .from("[data-hero-line]", { yPercent: 110, opacity: 0, duration: 1, stagger: 0.1 }, 0.25)
        .from("[data-hero-sub]", { opacity: 0, y: 16, duration: 0.9 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 }, "-=0.5")
        .from("[data-hero-visual]", { opacity: 0, duration: 0.9 }, "-=0.9")
        .fromTo(
          imgWrapRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
          "-=0.9"
        )
        .fromTo(imgRef.current, { scale: 1.15 }, { scale: 1, duration: 1.6, ease: "power3.out" }, "-=1.3")
        .from("[data-hero-strip]", { opacity: 0, duration: 0.8 }, "-=0.3");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative overflow-hidden bg-navy pb-0 pt-28 sm:pt-36 lg:pt-44"
    >
      {/* Layered background depth */}
      <div
        className="animate-glow-drift pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 70% 20%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent)",
        }}
      />
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
            <div className="relative mx-auto">
              {/* Ambient glow hugging the frame for extra depth */}
              <div
                className="animate-pulse-glow pointer-events-none absolute -inset-4 rounded-[1.5rem] bg-accent/10 blur-3xl sm:-inset-8"
                aria-hidden="true"
              />

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 bg-navy shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] sm:aspect-[16/11]">
                <div ref={imgWrapRef} className="absolute inset-0">
                  <div ref={imgRef} className="absolute inset-0 -top-[4%] h-[108%] w-full">
                    <Image
                      src="/images/company/factory-floor.png"
                      alt="CNC machining floor at Morya Engineering Works, Bhosari MIDC"
                      fill
                      priority
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Cinematic light sweep */}
                <div
                  className="animate-light-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  aria-hidden="true"
                />

                {/* Vignette — blends the photo into the dark hero canvas */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ boxShadow: "inset 0 0 90px 30px color-mix(in srgb, var(--color-navy) 85%, transparent)" }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
                  style={{ backgroundImage: "linear-gradient(to top, var(--color-navy), transparent)" }}
                />

                {/* Technical dressing */}
                <div className="tech-grid-navy pointer-events-none absolute inset-0 opacity-[0.15]" />

                {/* Animated crosshair over a point of interest */}
                <div className="pointer-events-none absolute left-[20%] top-[38%] hidden sm:block" aria-hidden="true">
                  <div className="animate-pulse-glow relative flex h-8 w-8 items-center justify-center">
                    <span className="absolute h-full w-px bg-accent/60" />
                    <span className="absolute h-px w-full bg-accent/60" />
                    <span className="absolute h-2 w-2 rounded-full border border-accent" />
                  </div>
                </div>

                <CornerBrackets color="rgba(255,255,255,0.35)" />

                <span className="absolute left-4 top-4 whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/60 backdrop-blur-sm sm:left-6 sm:top-6">
                  CNC <span className="hidden xs:inline">· VMC </span>MACHINING
                </span>

                <div className="absolute right-4 top-4 whitespace-nowrap rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/60 backdrop-blur-sm sm:right-6 sm:top-6">
                  <div className="hidden items-center gap-3 border-b border-white/10 pb-1 sm:flex">
                    <span>X 128.40</span>
                    <span>Y 64.00</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-0 sm:pt-1">
                    <span className="hidden sm:inline">Z 22.10 ·</span>
                    <span className="text-accent">±0.01 MM</span>
                  </div>
                </div>

                <span className="absolute bottom-4 left-4 flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white/60 backdrop-blur-sm sm:bottom-6 sm:left-6">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  SHOP FLOOR<span className="hidden sm:inline"> / BHOSARI MIDC · EST. 2019</span>
                </span>
              </div>
            </div>
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
