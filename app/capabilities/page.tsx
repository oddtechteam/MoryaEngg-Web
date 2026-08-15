import type { Metadata } from "next";
import Capabilities from "@/sections/Capabilities";
import Process from "@/sections/Process";

export const metadata: Metadata = {
  title: "Capabilities | Morya Engineering Works",
  description:
    "Sheet metal press tools, jigs & fixtures, CNC machining, VMC machining, checking gauges and material handling equipment — explore our core engineering capabilities.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <Capabilities />
      <Process />
    </>
  );
}
