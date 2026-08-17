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
    gsap.fromTo(
      "[data-mobile-link]",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.15 }
    );
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
        className={`fixed inset-0 z-[70] bg-navy tech-grid-navy transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-on-navy-line">
          <Image src="/images/company/me-logo.png" alt="Morya Engineering Works" width={150} height={100} className="h-8 w-auto" />
          <div className="flex items-center gap-2">
            <ThemeToggle variant="navy" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-on-navy">
              <X size={26} />
            </button>
          </div>
        </div>
        <nav className="flex flex-col px-6 py-10 gap-2">
          {navLinks.map((link) => (
            <div key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                data-mobile-link
                onClick={() => setOpen(false)}
                className="flex items-baseline py-3 border-b border-on-navy-line font-display text-4xl text-on-navy xs:text-5xl"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
        <div className="px-6 mt-6 flex flex-col gap-4">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-4 text-sm font-medium"
          >
            Get In Touch <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
