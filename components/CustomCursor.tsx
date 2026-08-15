"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type CursorState = "default" | "view" | "open";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      dotPos.x = e.clientX;
      dotPos.y = e.clientY;
      ringPos.x = e.clientX;
      ringPos.y = e.clientY;
      gsap.to(dot, { x: dotPos.x, y: dotPos.y, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { x: ringPos.x, y: ringPos.y, duration: 0.35, ease: "power3.out" });
    };

    const setCursorState = (el: Element | null) => {
      if (!el) return setState("default");
      if (el.closest("[data-cursor='view']")) return setState("view");
      if (el.closest("[data-cursor='open']")) return setState("open");
      if (el.closest("a, button, [data-cursor='interactive']")) return setState("open");
      return setState("default");
    };

    const onOver = (e: MouseEvent) => setCursorState(e.target as Element);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  const isExpanded = state !== "default";

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: isExpanded ? 0 : 1 }} />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: isExpanded ? 64 : 40,
          height: isExpanded ? 64 : 40,
          backgroundColor: isExpanded ? "rgba(255,255,255,0.15)" : "transparent",
        }}
      >
        {state === "view" && "View"}
        {state === "open" && "Open"}
      </div>
    </>
  );
}
