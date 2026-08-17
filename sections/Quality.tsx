"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { textReveal, staggerReveal, imageReveal, fadeUp } from "@/lib/animations";
import { qualityInstruments, certifications } from "@/lib/content";
import GalleryLightbox from "@/components/GalleryLightbox";

const cert = certifications[0];

export default function Quality() {
  const rootRef = useRef<HTMLElement>(null);
  const bannerWrapRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [certOpen, setCertOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-q-heading]", { trigger: rootRef.current });
      staggerReveal("[data-q-instrument]", { trigger: "[data-q-instruments]", stagger: 0.08 });
      imageReveal(bannerWrapRef.current, bannerRef.current, { trigger: bannerWrapRef.current });
      fadeUp("[data-q-cert]", { trigger: "[data-q-cert]", start: "top 85%", y: 24 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="quality" ref={rootRef} className="relative overflow-hidden bg-navy py-28 sm:py-36">
      <div className="tech-grid-navy pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-on-navy-blue">07 / QUALITY</span>
          <h1 className="font-display font-semibold leading-[0.95] text-on-navy" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            <span className="block overflow-hidden pb-[0.15em]"><span data-q-heading className="block">Precision Is</span></span>
            <span className="block overflow-hidden pb-[0.15em]"><span data-q-heading className="block text-on-navy-muted">Measured.</span></span>
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h3 className="mb-4 font-display text-xl text-on-navy">Inspection Instruments</h3>
            <ul data-q-instruments className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {qualityInstruments.map((tool) => (
                <li data-q-instrument key={tool} className="flex items-center gap-3 border-b border-on-navy-line pb-3 text-sm text-on-navy-muted">
                  <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <button
              data-q-cert
              onClick={() => setCertOpen(true)}
              data-cursor="view"
              className="group relative flex h-full items-center gap-4 border border-on-navy-line bg-white/[0.03] p-6 text-left transition-colors hover:border-accent"
            >
              <BadgeCheck size={32} className="shrink-0 text-accent" />
              <div>
                <span className="block font-display text-lg text-on-navy">{cert.name}</span>
                <span className="block text-xs text-on-navy-muted">Scope: {cert.scope}</span>
                <span className="mt-1 block font-mono text-[10px] tracking-wider text-on-navy-muted/70">
                  Cert. No. {cert.certNumber} · Valid until {cert.validUntil}
                </span>
              </div>
            </button>
          </div>
        </div>

        <div ref={bannerWrapRef} className="relative mt-14 aspect-[16/9] overflow-hidden border border-on-navy-line">
          <div ref={bannerRef} className="absolute inset-0">
            <Image
              src="/images/quality/precision-is-measured.png"
              alt="Quality inspection instruments reference chart"
              fill
              sizes="(min-width: 1024px) 84vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <GalleryLightbox
        items={[{ image: cert.image, title: `${cert.name} — Certificate of Registration`, category: cert.body }]}
        index={certOpen ? 0 : null}
        onClose={() => setCertOpen(false)}
        onNavigate={() => {}}
      />
    </section>
  );
}
