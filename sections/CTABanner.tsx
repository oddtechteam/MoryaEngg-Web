"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { textReveal, fadeUp } from "@/lib/animations";
import { whatsappUrl } from "@/lib/config";
import MagneticButton from "@/components/MagneticButton";

export default function CTABanner() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-ctab-heading]", { trigger: rootRef.current });
      fadeUp("[data-ctab-cta]", { trigger: rootRef.current, stagger: 0.08 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div className="tech-grid-navy pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1600px] px-5 text-center sm:px-8">
        <h2 className="mx-auto max-w-3xl font-display font-semibold leading-[0.95] text-on-navy" style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}>
          <span className="block overflow-hidden pb-[0.15em]"><span data-ctab-heading className="block">Have a Component</span></span>
          <span className="block overflow-hidden pb-[0.15em]"><span data-ctab-heading className="block text-on-navy-muted">to Build?</span></span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-on-navy-muted sm:text-base">
          Share your requirement, drawing or project details with our engineering team.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            as={Link}
            href="/contact"
            data-ctab-cta
            data-cursor="interactive"
            className="inline-flex items-center gap-2 bg-accent px-7 py-4 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Request a Quote <ArrowUpRight size={14} />
          </MagneticButton>
          <MagneticButton
            as="a"
            href={whatsappUrl("Hello Morya Engineering Works, I'd like to discuss a component/project requirement.")}
            target="_blank"
            rel="noopener noreferrer"
            data-ctab-cta
            data-cursor="interactive"
            className="inline-flex items-center gap-2 border border-on-navy-line px-7 py-4 text-sm font-medium text-on-navy hover:border-on-navy-blue hover:text-on-navy-blue transition-colors"
          >
            <MessageCircle size={14} /> WhatsApp Us
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
