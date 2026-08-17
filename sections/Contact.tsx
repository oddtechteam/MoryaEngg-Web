"use client";

import { useEffect, useRef } from "react";
import { Phone, MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { textReveal, fadeUp } from "@/lib/animations";
import { siteConfig, whatsappUrl } from "@/lib/config";
import MagneticButton from "@/components/MagneticButton";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textReveal("[data-contact-heading]", { trigger: rootRef.current });
      fadeUp("[data-contact-cta]", { trigger: rootRef.current, stagger: 0.08 });
      fadeUp("[data-contact-form]", { trigger: rootRef.current, y: 30 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={rootRef} className="relative overflow-hidden bg-navy py-28 sm:py-36">
      <div className="tech-grid-navy pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="mb-16">
          <span className="mb-4 block font-mono text-xs tracking-[0.3em] text-on-navy-blue">13 / CONTACT</span>
          <h1 className="font-display font-semibold leading-[0.92] text-on-navy" style={{ fontSize: "clamp(2.75rem, 8vw, 7.5rem)" }}>
            <span className="block overflow-hidden pb-[0.15em]"><span data-contact-heading className="block">Have a</span></span>
            <span className="block overflow-hidden pb-[0.15em]"><span data-contact-heading className="block">Component to</span></span>
            <span className="block overflow-hidden pb-[0.15em]"><span data-contact-heading className="block text-on-navy-muted">Build?</span></span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-on-navy-muted sm:text-lg">
            Share your requirement, drawing or project details with our engineering team.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton
              as="a"
              href="#contact-form"
              data-contact-cta
              data-cursor="interactive"
              className="inline-flex items-center gap-2 bg-accent text-white px-7 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Request a Quote <ArrowUpRight size={14} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href={whatsappUrl("Hello Morya Engineering Works, I'd like to discuss a component/project requirement.")}
              target="_blank"
              rel="noopener noreferrer"
              data-contact-cta
              data-cursor="interactive"
              className="inline-flex items-center gap-2 border border-on-navy-line px-7 py-4 text-sm font-medium text-on-navy hover:border-on-navy-blue hover:text-on-navy-blue transition-colors"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </MagneticButton>
            <MagneticButton
              as="a"
              href={`tel:+91${siteConfig.phones[0].number}`}
              data-contact-cta
              data-cursor="interactive"
              className="inline-flex items-center gap-2 border border-on-navy-line px-7 py-4 text-sm font-medium text-on-navy hover:border-on-navy-blue hover:text-on-navy-blue transition-colors"
            >
              <Phone size={14} /> Call Us
            </MagneticButton>
          </div>
        </div>

        <div id="contact-form" className="grid gap-10 border-t border-on-navy-line pt-16 lg:grid-cols-12 lg:gap-16">
          <div data-contact-form className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <div>
              <h3 className="mb-4 font-display text-lg text-on-navy">Phone</h3>
              {siteConfig.phones.map((p) => (
                <a key={p.number} href={`tel:+91${p.number}`} className="link-underline block text-sm text-on-navy-muted hover:text-on-navy">
                  {p.label} — +91 {p.number}
                </a>
              ))}
            </div>
            <div>
              <h3 className="mb-4 font-display text-lg text-on-navy">Email</h3>
              <a href={`mailto:${siteConfig.email}`} className="link-underline flex items-center gap-2 text-sm text-on-navy-muted hover:text-on-navy">
                <Mail size={14} /> {siteConfig.email}
              </a>
            </div>
            <div>
              <h3 className="mb-4 font-display text-lg text-on-navy">Workshop</h3>
              <p className="text-sm leading-relaxed text-on-navy-muted">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.line3}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
