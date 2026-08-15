import { Cog } from "lucide-react";

const items = [
  "CNC MACHINING",
  "VMC MACHINING",
  "TOOL ROOM ENGINEERING",
  "SHEET METAL PRESS TOOLS",
  "JIGS & FIXTURES",
  "CHECKING GAUGES",
  "PRECISION MANUFACTURING",
  "ESTD. AUGUST 2019",
];

export default function MarqueeTicker() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-bg-secondary py-5">
      <div className="animate-marquee flex w-max items-center gap-10">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-xs tracking-[0.2em] text-muted">
            {item}
            <Cog size={14} className="shrink-0 text-accent/60" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
