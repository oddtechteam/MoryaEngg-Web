"use client";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Reusable GSAP animation helpers. Each function is meant to be called
 * inside a gsap.context()/useGSAP() scope so cleanup is handled by the
 * caller. They intentionally take DOM targets (refs or selectors) rather
 * than owning any React state.
 *
 * Each helper checks prefers-reduced-motion and, when set, snaps targets
 * straight to their resting state instead of animating.
 */

const EASE = "power3.out";
const EASE_SOFT = "power2.out";

export function fadeUp(
  target: gsap.TweenTarget,
  opts: { delay?: number; y?: number; trigger?: Element | string | null; start?: string; stagger?: number } = {}
) {
  if (prefersReducedMotion()) return gsap.set(target, { y: 0, opacity: 1 });
  const { delay = 0, y = 40, trigger, start = "top 85%", stagger } = opts;
  return gsap.from(target, {
    y,
    opacity: 0,
    duration: 1,
    delay,
    stagger,
    ease: EASE,
    scrollTrigger: trigger
      ? { trigger, start }
      : undefined,
  });
}

export function fadeIn(target: gsap.TweenTarget, opts: { delay?: number; trigger?: Element | string | null; start?: string } = {}) {
  if (prefersReducedMotion()) return gsap.set(target, { opacity: 1 });
  const { delay = 0, trigger, start = "top 85%" } = opts;
  return gsap.from(target, {
    opacity: 0,
    duration: 1.2,
    delay,
    ease: EASE_SOFT,
    scrollTrigger: trigger ? { trigger, start } : undefined,
  });
}

export function textReveal(target: gsap.TweenTarget, opts: { delay?: number; stagger?: number; trigger?: Element | string | null; start?: string } = {}) {
  if (prefersReducedMotion()) return gsap.set(target, { yPercent: 0, opacity: 1 });
  const { delay = 0, stagger = 0.03, trigger, start = "top 85%" } = opts;
  return gsap.from(target, {
    yPercent: 110,
    opacity: 0,
    duration: 0.9,
    ease: EASE,
    stagger,
    delay,
    scrollTrigger: trigger ? { trigger, start } : undefined,
  });
}

export function imageReveal(wrapper: gsap.TweenTarget, img: gsap.TweenTarget, opts: { trigger?: Element | string | null; start?: string } = {}) {
  if (prefersReducedMotion()) {
    gsap.set(wrapper, { clipPath: "inset(0% 0% 0% 0%)" });
    return gsap.set(img, { scale: 1, opacity: 1 });
  }
  const { trigger, start = "top 80%" } = opts;
  const tl = gsap.timeline({
    scrollTrigger: trigger ? { trigger, start } : undefined,
  });
  tl.fromTo(
    wrapper,
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" }
  ).fromTo(
    img,
    { scale: 1.35, opacity: 0.6 },
    { scale: 1, opacity: 1, duration: 1.3, ease: "power3.out" },
    0
  );
  return tl;
}

export function scaleReveal(target: gsap.TweenTarget, opts: { delay?: number; trigger?: Element | string | null; start?: string } = {}) {
  if (prefersReducedMotion()) return gsap.set(target, { scale: 1, opacity: 1 });
  const { delay = 0, trigger, start = "top 85%" } = opts;
  return gsap.from(target, {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    delay,
    ease: EASE,
    scrollTrigger: trigger ? { trigger, start } : undefined,
  });
}

export function parallax(target: gsap.TweenTarget, opts: { trigger: Element | string | null; amount?: number; scrub?: number | boolean }) {
  if (prefersReducedMotion()) return undefined;
  const { trigger, amount = 100, scrub = true } = opts;
  return gsap.to(target, {
    yPercent: amount,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub,
    },
  });
}

export function staggerReveal(target: gsap.TweenTarget, opts: { trigger?: Element | string | null; start?: string; stagger?: number; y?: number } = {}) {
  if (prefersReducedMotion()) return gsap.set(target, { y: 0, opacity: 1 });
  const { trigger, start = "top 85%", stagger = 0.08, y = 30 } = opts;
  return gsap.from(target, {
    y,
    opacity: 0,
    duration: 0.8,
    stagger,
    ease: EASE,
    scrollTrigger: trigger ? { trigger, start } : undefined,
  });
}

export function counterAnimation(
  target: HTMLElement,
  endValue: number,
  opts: { duration?: number; trigger?: Element | string | null; start?: string; suffix?: string; prefix?: string } = {}
) {
  const { duration = 1.8, trigger, start = "top 85%", suffix = "", prefix = "" } = opts;
  if (prefersReducedMotion()) {
    target.textContent = `${prefix}${endValue}${suffix}`;
    return undefined;
  }
  const counter = { val: 0 };
  return gsap.to(counter, {
    val: endValue,
    duration,
    ease: "power2.out",
    scrollTrigger: trigger ? { trigger, start, once: true } : undefined,
    onUpdate: () => {
      target.textContent = `${prefix}${Math.floor(counter.val)}${suffix}`;
    },
  });
}
