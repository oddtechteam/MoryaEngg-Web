import type { Metadata } from "next";
import Machines from "@/sections/Machines";

export const metadata: Metadata = {
  title: "Machines | Morya Engineering Works",
  description:
    "A look at the CNC lathes, VMC, milling machines and surface grinders on the Morya Engineering Works shop floor in Bhosari MIDC, Pune.",
  alternates: { canonical: "/machines" },
};

export default function MachinesPage() {
  return <Machines />;
}
