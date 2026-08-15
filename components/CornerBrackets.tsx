"use client";

type Props = {
  className?: string;
  color?: string;
};

/**
 * Four camera-viewfinder-style corner marks, meant to be animated in via
 * GSAP by targeting `[data-corner]` inside the returned wrapper.
 */
export default function CornerBrackets({ className = "", color = "currentColor" }: Props) {
  const corner = "absolute h-6 w-6 sm:h-8 sm:w-8";
  return (
    <div className={`pointer-events-none absolute inset-3 sm:inset-4 ${className}`} aria-hidden="true">
      <svg data-corner className={`${corner} left-0 top-0`} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M32 1H7C3.68629 1 1 3.68629 1 7V32" stroke={color} strokeWidth="1.5" />
      </svg>
      <svg data-corner className={`${corner} right-0 top-0`} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M0 1H25C28.3137 1 31 3.68629 31 7V32" stroke={color} strokeWidth="1.5" />
      </svg>
      <svg data-corner className={`${corner} bottom-0 left-0`} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M32 31H7C3.68629 31 1 28.3137 1 25V0" stroke={color} strokeWidth="1.5" />
      </svg>
      <svg data-corner className={`${corner} bottom-0 right-0`} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M0 31H25C28.3137 31 31 28.3137 31 25V0" stroke={color} strokeWidth="1.5" />
      </svg>
    </div>
  );
}
