import type { Metadata } from "next";
import About from "@/sections/About";
import Values from "@/sections/Values";
import Industries from "@/sections/Industries";

export const metadata: Metadata = {
  title: "About Us | Morya Engineering Works",
  description:
    "Morya Engineering Works was established in August 2019 by Mr. Avinash Adavale. Learn about our journey, principles and the industries we serve across Pune, Maharashtra.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Values />
      <Industries />
    </>
  );
}
