"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Each route change swaps the page content while the Lenis/ScrollTrigger
  // instances persist (Navbar/Footer live in the shared layout). Without
  // this, Lenis keeps the previous page's scroll height and ScrollTrigger
  // keeps stale pin start/end offsets, which can trap scrolling partway
  // down the new page.
  useEffect(() => {
    const lenis = lenisRef.current;
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    const raf = requestAnimationFrame(() => {
      lenis?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <>{children}</>;
}
