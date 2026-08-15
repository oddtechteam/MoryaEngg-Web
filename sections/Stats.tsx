"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { counterAnimation } from "@/lib/animations";
import { heroStats } from "@/lib/content";

export default function Stats() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-stat-value]");
      items.forEach((el, i) => {
        const end = heroStats[i].value;
        counterAnimation(el, end, {
          trigger: el,
          start: "top 90%",
          prefix: heroStats[i].prefix,
          suffix: heroStats[i].suffix,
        });
      });

      gsap.from("[data-stat-item]", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 90%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative border-y border-text/8 bg-bg-secondary">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 divide-x divide-y divide-text/8 px-5 sm:px-8 lg:grid-cols-4 lg:divide-y-0">
        {heroStats.map((stat) => (
          <div key={stat.label} data-stat-item className="flex flex-col gap-2 px-6 py-10 sm:px-8">
            <span
              data-stat-value
              className="font-display text-4xl sm:text-5xl font-medium text-text"
            >
              {stat.prefix}0{stat.suffix}
            </span>
            <span className="text-xs uppercase tracking-wide text-muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
