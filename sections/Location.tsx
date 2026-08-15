"use client";

import { useEffect, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { textReveal, fadeUp } from "@/lib/animations";
import { siteConfig } from "@/lib/config";
import MagneticButton from "@/components/MagneticButton";

export default function Location() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-loc-heading]", { trigger: rootRef.current });
      fadeUp("[data-loc-panel]", { trigger: rootRef.current, y: 30 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-bg py-28 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-accent">12 / LOCATION</span>
          <h2 className="font-display font-medium leading-[0.95] text-text" style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            <span className="block overflow-hidden pb-[0.15em]"><span data-loc-heading className="block">Located In Pune&rsquo;s</span></span>
            <span className="block overflow-hidden pb-[0.15em]"><span data-loc-heading className="block text-muted">Industrial Belt.</span></span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div data-loc-panel className="relative aspect-[4/3] overflow-hidden border border-text/10 lg:col-span-8 lg:aspect-auto">
            <iframe
              title="Morya Engineering Works location map"
              src={siteConfig.mapsEmbedUrl}
              className="h-full min-h-[360px] w-full grayscale contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-4 border border-text/15" />
            <span className="pointer-events-none absolute left-6 top-6 flex items-center gap-2 bg-bg/80 px-3 py-1.5 font-mono text-[10px] tracking-widest text-text backdrop-blur-sm">
              <MapPin size={12} className="text-accent" /> BHOSARI MIDC, PUNE
            </span>
          </div>

          <div data-loc-panel className="flex flex-col justify-between gap-8 border border-text/10 bg-bg-secondary p-8 lg:col-span-4">
            <div>
              <h3 className="mb-4 font-display text-xl text-text">Address</h3>
              <p className="text-sm leading-relaxed text-muted">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.line3}
              </p>
            </div>

            <MagneticButton
              as="a"
              href={siteConfig.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="interactive"
              className="inline-flex w-fit items-center gap-2 border border-text/15 px-6 py-3.5 text-sm font-medium text-text hover:border-accent hover:text-accent transition-colors"
            >
              Get Directions <Navigation size={14} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
