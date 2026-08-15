"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap } from "@/lib/gsap";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: unknown;
};

export default function MagneticButton({ children, className, as: Tag = "button", ...rest }: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.35, y: y * 0.45, duration: 0.4, ease: "power2.out" });
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
