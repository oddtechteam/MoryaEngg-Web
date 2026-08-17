"use client";

import { MessageCircle, Phone } from "lucide-react";
import { whatsappUrl, siteConfig } from "@/lib/config";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col gap-3 sm:right-6">
      <a
        href={whatsappUrl("Hello Morya Engineering Works, I'd like to discuss a component/project requirement.")}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="open"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
        <MessageCircle size={24} className="relative fill-white text-[#25D366]" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-xs text-on-navy opacity-0 transition-opacity duration-200 group-hover:opacity-100 border border-on-navy-line">
          Chat with us
        </span>
      </a>

      <a
        href={`tel:+91${siteConfig.phones[0].number}`}
        data-cursor="open"
        aria-label="Call Morya Engineering Works"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-black/20"
      >
        <Phone size={22} className="relative fill-white text-accent" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-xs text-on-navy opacity-0 transition-opacity duration-200 group-hover:opacity-100 border border-on-navy-line">
          Call us
        </span>
      </a>
    </div>
  );
}
