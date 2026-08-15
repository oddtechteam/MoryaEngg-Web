import type { Metadata } from "next";
import Contact from "@/sections/Contact";
import Location from "@/sections/Location";

export const metadata: Metadata = {
  title: "Contact Us | Morya Engineering Works",
  description:
    "Get in touch with Morya Engineering Works — Bhosari MIDC, Pune. Call, WhatsApp or send an enquiry for CNC machining, tool room and precision manufacturing work.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Contact />
      <Location />
    </>
  );
}
