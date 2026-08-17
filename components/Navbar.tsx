"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/lib/content";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoBadgeRef = useRef<HTMLSpanElement>(null);

  // Entrance animation
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pillRef.current,
        { y: -90, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "elastic.out(1, 0.65)", delay: 0.15 }
      );
      gsap.fromTo(
        "[data-nav-item]",
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out", delay: 0.55 }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  // Scroll state + scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Shrink effect: pill compacts (height + width), logo scales down
  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.to(pillRef.current, {
      paddingTop: scrolled ? 7 : 14,
      paddingBottom: scrolled ? 7 : 14,
      maxWidth: scrolled ? 1040 : 1500,
      duration: 0.55,
      ease: "power3.out",
    });
    gsap.to(headerRef.current, {
      top: scrolled ? 8 : 16,
      duration: 0.55,
      ease: "power3.out",
    });
    gsap.to(logoBadgeRef.current, {
      scale: scrolled ? 0.8 : 1,
      duration: 0.55,
      ease: "power3.out",
    });
  }, [scrolled]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-mobile-fade]",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        "[data-mobile-link]",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(
        "[data-mobile-cta]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.5 }
      );
    });
    return () => ctx.revert();
  }, [open]);

  // Sliding hover highlight behind nav links
  const moveHighlight = (el: HTMLElement | null) => {
    const highlight = highlightRef.current;
    const nav = navRef.current;
    if (!highlight || !nav) return;
    if (!el) {
      const active = nav.querySelector<HTMLElement>("[data-active='true']");
      if (active) {
        moveHighlight(active);
        return;
      }
      gsap.to(highlight, { opacity: 0, duration: 0.25, ease: "power2.out" });
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    gsap.to(highlight, {
      opacity: 1,
      x: elRect.left - navRect.left,
      width: elRect.width,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  useEffect(() => {
    const active = navRef.current?.querySelector<HTMLElement>("[data-active='true']");
    if (active) moveHighlight(active);
    else moveHighlight(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <header ref={headerRef} className="fixed top-4 inset-x-3 z-50 sm:inset-x-6 lg:inset-x-10">
        <div
          ref={pillRef}
          className={`relative mx-auto flex max-w-[1500px] items-center justify-between overflow-hidden rounded-full border border-line bg-bg/90 backdrop-blur-md px-4 py-3.5 transition-shadow duration-500 sm:px-6 ${
            scrolled ? "shadow-[0_10px_30px_-12px_rgba(16,24,40,0.18)]" : "shadow-[0_4px_18px_-10px_rgba(16,24,40,0.12)]"
          }`}
        >
          <Link
            href="/"
            data-nav-item
            className="hidden sm:flex group items-center gap-2.5 font-display font-semibold leading-none tracking-tight text-text"
            data-cursor="interactive"
          >
            <span ref={logoBadgeRef} className="flex shrink-0 items-center">
              <Image src="/images/company/me-logo.png" alt="Morya Engineering Works" width={150} height={100} className="h-9 w-auto sm:h-10" />
            </span>
          </Link>

          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:hidden"
            data-cursor="interactive"
          >
            <Image src="/images/company/me-logo.png" alt="Morya Engineering Works" width={150} height={100} className="h-8 w-auto" />
          </Link>

          <nav
            ref={navRef}
            className="relative hidden lg:flex items-center gap-1"
            onMouseLeave={() => moveHighlight(null)}
          >
            <div
              ref={highlightRef}
              className="pointer-events-none absolute inset-y-0 left-0 top-0 h-full rounded-full bg-surface opacity-0"
              style={{ width: 0 }}
            />
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-nav-item
                  data-active={isActive}
                  onMouseEnter={(e) => moveHighlight(e.currentTarget)}
                  className={`relative z-10 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-text" : "text-muted hover:text-text"
                  }`}
                  data-cursor="interactive"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle data-nav-item />
            <MagneticButton
              as={Link}
              href="/contact"
              data-nav-item
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-on-navy transition-colors hover:bg-accent"
              data-cursor="interactive"
            >
              Get In Touch <ArrowUpRight size={14} />
            </MagneticButton>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="text-text"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              data-cursor="interactive"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Scroll progress indicator */}
          <div className="pointer-events-none absolute inset-x-3 bottom-0 h-[2px] overflow-hidden rounded-full bg-line/60 sm:inset-x-5">
            <div
              ref={progressRef}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-deep"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed inset-0 z-[70] flex flex-col bg-navy tech-grid-navy transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div data-mobile-fade className="flex items-center justify-between border-b border-on-navy-line px-6 py-6">
          <Image src="/images/company/me-logo.png" alt="Morya Engineering Works" width={150} height={100} className="h-8 w-auto" />
          <div className="flex items-center gap-2.5">
            <ThemeToggle variant="navy" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              data-cursor="interactive"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-on-navy-line text-on-navy-muted transition-colors hover:border-accent/60 hover:text-on-navy"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <span
          data-mobile-fade
          className="px-6 pt-8 font-mono text-[11px] tracking-[0.3em] text-on-navy-muted/60"
        >
          MENU
        </span>

        <nav className="flex flex-1 flex-col justify-center px-6">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <div key={link.href} className="overflow-hidden border-b border-on-navy-line">
                <Link
                  href={link.href}
                  data-mobile-link
                  data-active={isActive}
                  onClick={() => setOpen(false)}
                  data-cursor="interactive"
                  className={`group flex items-center justify-between gap-4 py-4 transition-colors ${
                    isActive ? "text-accent" : "text-on-navy hover:text-accent"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-on-navy-muted/60 transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-4xl leading-none xs:text-5xl">{link.label}</span>
                  </span>
                  <ArrowUpRight
                    size={22}
                    className={`shrink-0 transition-all duration-300 ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        <div data-mobile-cta className="border-t border-on-navy-line px-6 py-6">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            data-cursor="interactive"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
          >
            Get In Touch <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
