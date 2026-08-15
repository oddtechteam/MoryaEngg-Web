import type { LucideIcon } from "lucide-react";
import { Building2, Cog, CircuitBoard, FolderOpen, ShieldCheck, PhoneCall } from "lucide-react";

export type ExploreItem = {
  index: string;
  title: string;
  category: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const exploreItems: ExploreItem[] = [
  {
    index: "01",
    title: "About Us",
    category: "Since August 2019",
    description: "Our journey since August 2019, and the people behind the work.",
    href: "/about",
    icon: Building2,
  },
  {
    index: "02",
    title: "Capabilities",
    category: "Press Tools · CNC · VMC",
    description: "Press tools, jigs & fixtures, CNC and VMC machining capability.",
    href: "/capabilities",
    icon: Cog,
  },
  {
    index: "03",
    title: "Machines",
    category: "Shop Floor",
    description: "A look at the machines behind the work on our shop floor.",
    href: "/machines",
    icon: CircuitBoard,
  },
  {
    index: "04",
    title: "Projects",
    category: "Selected Work",
    description: "Press tools, fixtures, checking gauges and machined components.",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    index: "05",
    title: "Quality",
    category: "ISO 9001:2015",
    description: "Our quality standard room and ISO 9001:2015 certification.",
    href: "/quality",
    icon: ShieldCheck,
  },
  {
    index: "06",
    title: "Contact",
    category: "Bhosari MIDC, Pune",
    description: "Share your requirement, drawing or project with our team.",
    href: "/contact",
    icon: PhoneCall,
  },
];
