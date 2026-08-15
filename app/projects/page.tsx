import type { Metadata } from "next";
import Projects from "@/sections/Projects";
import JigsFixtures from "@/sections/JigsFixtures";
import ToolDie from "@/sections/ToolDie";
import Customers from "@/sections/Customers";

export const metadata: Metadata = {
  title: "Projects | Morya Engineering Works",
  description:
    "Selected engineering work from Morya Engineering Works — press tools, forming tools, jigs & fixtures, checking gauges and hydraulic leakage gauges.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Projects />
      <JigsFixtures />
      <ToolDie />
      <Customers />
    </>
  );
}
