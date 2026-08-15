"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "@/lib/content";

type Props = {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function GalleryLightbox({ items, index, onClose, onNavigate }: Props) {
  const isOpen = index !== null;
  const item = isOpen ? items[index] : null;

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index !== null) onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft" && index !== null) onNavigate((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, index, items.length, onClose, onNavigate]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/97 backdrop-blur-sm px-4 py-10" onClick={onClose}>
      <button
        onClick={onClose}
        aria-label="Close"
        data-cursor="interactive"
        className="absolute right-5 top-5 text-on-navy-muted hover:text-on-navy"
      >
        <X size={28} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index! - 1 + items.length) % items.length);
        }}
        aria-label="Previous"
        data-cursor="interactive"
        className="absolute left-3 sm:left-6 text-on-navy-muted hover:text-on-navy"
      >
        <ChevronLeft size={32} />
      </button>

      <div className="relative mx-auto flex max-h-full w-full max-w-4xl flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-on-navy-line">
          <Image src={item.image} alt={item.title} fill sizes="90vw" className="object-cover" />
        </div>
        <div className="flex items-center justify-between font-mono text-xs tracking-widest text-on-navy-muted">
          <span>{item.category.toUpperCase()}</span>
          <span>{String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        </div>
        <h3 className="font-display text-2xl text-on-navy">{item.title}</h3>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index! + 1) % items.length);
        }}
        aria-label="Next"
        data-cursor="interactive"
        className="absolute right-3 sm:right-6 text-on-navy-muted hover:text-on-navy"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
}
