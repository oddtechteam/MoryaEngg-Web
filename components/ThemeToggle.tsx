"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export default function ThemeToggle({
  className = "",
  variant = "canvas",
  ...rest
}: { className?: string; variant?: "canvas" | "navy" } & Record<string, unknown>) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Deliberate post-hydration read: the anti-flash script in <head> has
    // already set the correct theme on <html> before this runs, but SSR
    // has no access to localStorage/matchMedia, so the icon must render a
    // neutral placeholder on first paint and pick up the real value here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(readStoredTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("theme", next);
  };

  // Render a neutral placeholder until mounted so the icon never flashes
  // the wrong state relative to the anti-flash script's choice.
  const isLight = theme === "light";

  const variantClass =
    variant === "navy"
      ? "border-on-navy-line text-on-navy-muted hover:text-on-navy"
      : "border-line text-muted hover:text-text";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === null ? "Toggle theme" : isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      data-cursor="interactive"
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${variantClass} ${className}`}
      {...rest}
    >
      <Sun
        size={16}
        className={`absolute transition-all duration-300 ${
          theme === null ? "opacity-0" : isLight ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
      />
      <Moon
        size={16}
        className={`absolute transition-all duration-300 ${
          theme === null ? "opacity-0" : !isLight ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
        }`}
      />
    </button>
  );
}
