import type { Metadata } from "next";
import Quality from "@/sections/Quality";

export const metadata: Metadata = {
  title: "Quality | Morya Engineering Works",
  description:
    "Morya Engineering Works is ISO 9001:2015 certified for engineering job works. Explore our quality standard room and precision inspection instruments.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  return <Quality />;
}
