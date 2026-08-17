"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import { navLinks, capabilities } from "@/lib/content";
import { siteConfig as config, whatsappUrl } from "@/lib/config";
import MagneticButton from "@/components/MagneticButton";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-on-navy-line bg-navy">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="tech-grid-navy pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-on-navy-blue/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20">
        {/* CTA strip */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-on-navy-line pb-14 lg:flex-row lg:items-center">
          <h3 className="max-w-lg font-display text-3xl font-semibold leading-tight text-on-navy sm:text-4xl">
            Let&rsquo;s build your next component.
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton
              as={Link}
              href="/contact"
              data-cursor="interactive"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Request a Quote <ArrowUpRight size={14} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href={whatsappUrl("Hello Morya Engineering Works, I'd like to discuss a component/project requirement.")}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="interactive"
              className="inline-flex items-center gap-2 border border-on-navy-line px-6 py-3.5 text-sm font-medium text-on-navy transition-colors hover:border-on-navy-blue hover:text-on-navy-blue"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </MagneticButton>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-12 pt-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="mb-5 flex items-center">
              <Image
                src="/images/company/footer-logo.png"
                alt="Morya Engineering Works logo"
                width={1536}
                height={1024}
                className="h-20 w-auto"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-on-navy-muted">{config.tagline}</p>
            <p className="mt-4 font-mono text-xs tracking-widest text-on-navy-muted/60">
              ESTABLISHED {config.establishedYear} · BHOSARI MIDC, PUNE
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-5 text-xs uppercase tracking-[0.2em] text-on-navy-muted">Navigate</h4>
            <ul className="flex flex-col gap-3">
              {navLinks
                .filter((l) => l.href !== "/")
                .map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="link-underline text-sm text-on-navy-muted hover:text-on-navy">
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 text-xs uppercase tracking-[0.2em] text-on-navy-muted">Capabilities</h4>
            <ul className="flex flex-col gap-3">
              {capabilities.slice(0, 6).map((c) => (
                <li key={c.index}>
                  <Link href="/capabilities" className="link-underline text-sm text-on-navy-muted hover:text-on-navy">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 text-xs uppercase tracking-[0.2em] text-on-navy-muted">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm">
              {config.phones.map((p) => (
                <li key={p.number}>
                  <a
                    href={`tel:+91${p.number}`}
                    className="group flex items-center gap-3 text-on-navy-muted hover:text-on-navy"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-on-navy-line text-on-navy-blue transition-colors group-hover:border-on-navy-blue">
                      <Phone size={14} />
                    </span>
                    <span className="font-semibold tracking-wide text-on-navy tabular-nums">+91 {p.number}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="group flex items-center gap-3 text-on-navy-muted hover:text-on-navy"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-on-navy-line text-on-navy-blue transition-colors group-hover:border-on-navy-blue">
                    <Mail size={14} />
                  </span>
                  <span className="link-underline break-all">{config.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={config.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-on-navy-muted hover:text-on-navy"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-on-navy-line text-on-navy-blue transition-colors group-hover:border-on-navy-blue">
                    <MapPin size={14} />
                  </span>
                  <span className="link-underline pt-2 leading-relaxed">{config.address.line3}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-on-navy-line pt-8 text-xs text-on-navy-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Morya Engineering Works. All Rights Reserved.</span>
          <div className="flex items-center gap-4">
            <span className="font-mono tracking-widest text-on-navy-muted/60">PRECISION · ENGINEERING · MANUFACTURING</span>
            <span className="hidden text-on-navy-line sm:inline">|</span>
            <a
              href="https://oddcreatives.in"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-on-navy-muted hover:text-on-navy"
            >
              Developed by oddcreatives.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
