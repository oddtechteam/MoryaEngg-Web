/**
 * All copy and structured content sourced from the Morya Engineering Works
 * company profile. Nothing here is invented — specifications, customer
 * names, certifications and process steps mirror the supplied material.
 */

export const navLinks = [
  { index: "01", label: "Home", href: "/" },
  { index: "02", label: "About", href: "/about" },
  { index: "03", label: "Capabilities", href: "/capabilities" },
  { index: "04", label: "Machines", href: "/machines" },
  { index: "05", label: "Projects", href: "/projects" },
  { index: "06", label: "Quality", href: "/quality" },
];

export const heroStats = [
  { value: 2019, prefix: "", suffix: "", label: "Established" },
  { value: 15, prefix: "", suffix: "+", label: "Years of Engineering Experience" },
  { value: 5, prefix: "", suffix: "+", label: "Core Machining Capabilities" },
  { value: 4, prefix: "", suffix: "+", label: "Industry Segments" },
];

export const aboutContent = {
  founderName: "Mr. Avinash Adavale",
  paragraphs: [
    "Morya Engineering Works was established in August 2019. Since inception, the company has been engaged in the design, manufacturing and supply of sheet metal press tools, jigs & fixtures, sheet metal components and fabricated assemblies.",
    "The company was founded by Mr. Avinash Adavale, who began his career after completing a Diploma in Mechanical Engineering (DME) from Ahmednagar. With approximately 15 years of experience in sheet metal press tools & fixtures, his journey progressed from supervisor to a plant-head-level role, working across multiple projects involving critical fixtures, gauges and dies.",
    "Today, the company continues to grow across industry segments including automotive, agricultural, electrical and hydraulic.",
  ],
};

export type Capability = {
  index: string;
  title: string;
  description: string;
  image: string;
};

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Sheet Metal Press Tools",
    description:
      "Stage tools and forming tools engineered and built in-house for consistent, repeatable production.",
    image: "/images/projects/press-tool-stage.jpg",
  },
  {
    index: "02",
    title: "Jigs & Fixtures",
    description:
      "Machining and checking fixtures, including fixture development for job machining on HMC machines.",
    image: "/images/projects/fixture-assembly-hmc.jpg",
  },
  {
    index: "03",
    title: "CNC Machining",
    description: "Precision turning across the shop floor on CNC lathes.",
    image: "/images/machines/cnc-lathe-lmw.jpg",
  },
  {
    index: "04",
    title: "VMC Machining",
    description: "Vertical machining centre capability for complex, close-tolerance components.",
    image: "/images/machines/vmc-ams-540v.jpg",
  },
  {
    index: "05",
    title: "Sheet Metal Components",
    description: "Formed and stamped components manufactured to customer drawings.",
    image: "/images/projects/press-tool-components.jpg",
  },
  {
    index: "06",
    title: "Fabricated & Welding Assemblies",
    description: "Welding fixture assemblies and value-added fabricated structures.",
    image: "/images/machines/milling-machine-2.jpg",
  },
  {
    index: "07",
    title: "Checking Gauges",
    description: "Including hydraulic leakage checking gauges built to verify part integrity.",
    image: "/images/projects/hydraulic-leakage-gauge-1.jpg",
  },
  {
    index: "08",
    title: "Material Handling Equipment",
    description: "Equipment designed and fabricated to support production and logistics on the floor.",
    image: "/images/company/workshop-floor-wide.jpg",
  },
];

export type Machine = {
  index: string;
  name: string;
  category: string;
  description: string;
  images: string[];
};

// Exactly the five machines on the shop floor, as confirmed by the company.
export const machines: Machine[] = [
  {
    index: "01",
    name: "CNC Machine",
    category: "LMW · CNC Turning",
    description: "CNC lathe used for precision turning of components and fixture parts.",
    images: [
      "/images/machines/cnc-lathe-lmw.jpg",
      "/images/machines/cnc-lathe-2.jpg",
      "/images/machines/cnc-control-panel.jpg",
      "/images/machines/vmc-ams-540v.jpg",
    ],
  },
  {
    index: "02",
    name: "Milling Machine",
    category: "Conventional Machining",
    description: "Manual milling machines used across tool room and fixture manufacturing work.",
    images: [
      "/images/machines/milling-primary.jpg",
      "/images/machines/milling-machine-1.jpg",
      "/images/machines/milling-machine-2.jpg",
      "/images/machines/milling-machine-3.jpg",
      "/images/machines/milling-machine-4.jpg",
      "/images/machines/surface-grinder.jpg",
    ],
  },
  {
    index: "03",
    name: "Drilling Machine",
    category: "M1TR",
    description: "Drilling capability supporting tool room and component work.",
    images: ["/images/machines/drilling-m1tr.jpg"],
  },
  {
    index: "04",
    name: "Tapping Machine",
    category: "Tool Room",
    description: "Tapping capability supporting tool room and component work.",
    images: ["/images/machines/tapping-machine.png"],
  },
  {
    index: "05",
    name: "Wire Cut Machine",
    category: "Wire EDM",
    description: "Wire-cut capability supporting precision tool and die work.",
    images: ["/images/machines/wire-cut-machine.png"],
  },
];

export type ProcessStep = {
  index: string;
  title: string;
};

// Sequence exactly as shown in the company profile's process flow diagram.
export const processSteps: ProcessStep[] = [
  { index: "01", title: "Customer RFQ" },
  { index: "02", title: "Part Design Feasibility" },
  { index: "03", title: "PO / Job Sign-Off" },
  { index: "04", title: "Tool Design" },
  { index: "05", title: "Design Review" },
  { index: "06", title: "Manufacturing" },
  { index: "07", title: "Assembly" },
  { index: "08", title: "Tryout" },
  { index: "09", title: "PDI" },
  { index: "10", title: "Tool Buy-Off" },
];

export type GalleryItem = {
  title: string;
  category: string;
  image: string;
};

export const jigsFixturesGallery: GalleryItem[] = [
  {
    title: "Fixture Development — HMC Job Machining",
    category: "Machining Fixture",
    image: "/images/projects/fixture-assembly-hmc.jpg",
  },
  {
    title: "Fixture for Machining",
    category: "Machining Fixture",
    image: "/images/projects/machining-fixture.jpg",
  },
  {
    title: "Checking Gauge",
    category: "Checking Gauge",
    image: "/images/projects/checking-gauge.jpg",
  },
  {
    title: "Hydraulic Leakage Checking Gauge",
    category: "Hydraulic Leakage Gauge",
    image: "/images/projects/hydraulic-leakage-gauge-1.jpg",
  },
  {
    title: "Hydraulic Leakage Checking Gauge",
    category: "Hydraulic Leakage Gauge",
    image: "/images/projects/hydraulic-leakage-gauge-2.jpg",
  },
];

export const toolDieGallery: GalleryItem[] = [
  {
    title: "Forming Tool",
    category: "Sheet Metal Press Tool",
    image: "/images/projects/press-tool-forming.jpg",
  },
  {
    title: "Stage Tool",
    category: "Sheet Metal Press Tool",
    image: "/images/projects/press-tool-stage.jpg",
  },
  {
    title: "Press Tool — Die Detail",
    category: "Tool Room Engineering",
    image: "/images/projects/press-tool-mold.jpg",
  },
  {
    title: "Formed Components",
    category: "Sheet Metal Components",
    image: "/images/projects/press-tool-components.jpg",
  },
];

export const projectsGallery: (GalleryItem & { tags: string[] })[] = [
  { title: "Stage Tool", category: "Press Tools", image: "/images/projects/press-tool-stage.jpg", tags: ["Press Tools"] },
  { title: "Forming Tool", category: "Forming Tools", image: "/images/projects/press-tool-forming.jpg", tags: ["Forming Tools"] },
  { title: "Press Tool Die Detail", category: "Press Tools", image: "/images/projects/press-tool-mold.jpg", tags: ["Press Tools"] },
  { title: "Formed Components", category: "Machined Components", image: "/images/projects/press-tool-components.jpg", tags: ["Machined Components"] },
  { title: "Fixture — HMC Job Machining", category: "Fixtures", image: "/images/projects/fixture-assembly-hmc.jpg", tags: ["Fixtures", "Jigs"] },
  { title: "Machining Fixture", category: "Jigs", image: "/images/projects/machining-fixture.jpg", tags: ["Jigs", "Fixtures"] },
  { title: "Checking Gauge", category: "Checking Gauges", image: "/images/projects/checking-gauge.jpg", tags: ["Checking Gauges"] },
  { title: "Hydraulic Leakage Gauge", category: "Hydraulic Leakage Gauges", image: "/images/projects/hydraulic-leakage-gauge-1.jpg", tags: ["Hydraulic Leakage Gauges"] },
  { title: "Hydraulic Leakage Gauge", category: "Hydraulic Leakage Gauges", image: "/images/projects/hydraulic-leakage-gauge-2.jpg", tags: ["Hydraulic Leakage Gauges"] },
  { title: "VMC — AMS 540V", category: "Manufacturing Equipment", image: "/images/machines/vmc-ams-540v.jpg", tags: ["Manufacturing Equipment"] },
  { title: "CNC Lathe — LMW", category: "Manufacturing Equipment", image: "/images/machines/cnc-lathe-lmw.jpg", tags: ["Manufacturing Equipment"] },
];

export const missionPrinciples = [
  "To set the standard for the industries we serve and to be the organization against which others are measured.",
  "To continually endeavor for excellence in all that we do.",
  "To provide the highest quality press tools, jigs & fixtures, value-added assemblies and sheet metal components to our customers.",
  "To maintain the highest standards of honesty, integrity & customer satisfaction in all our day-to-day business life.",
];

export const customers = [
  "Patil Automation Pvt. Ltd.",
  "Welmade Locking System Pvt. Ltd.",
  "SD Engineerstech Pvt. Ltd.",
  "Raizan Steel Engineering Pvt. Ltd.",
  "Tooltech Component Pvt. Ltd.",
  "PrimeSlo And Ergo System",
  "Techno Tools Industries",
];

export const qualityInstruments = [
  "Digital & dial vernier calipers",
  "Height gauge with probe",
  "Dial indicators & comparators",
  "Protractor & angle gauges",
  "Surface plates",
];

export const certifications = [
  {
    name: "ISO 9001:2015",
    scope: "Engineering Job Works",
    body: "UK Certification and Assessment Ltd. (UKASCERT)",
    certNumber: "Q-271513092023",
    issueDate: "13 September 2023",
    validUntil: "12 September 2026",
    image: "/images/certificates/iso-9001-2015-certificate.jpg",
  },
];

export const projectTypes = [
  "CNC Machining",
  "VMC Machining",
  "Tool & Die",
  "Jigs & Fixtures",
  "Sheet Metal Components",
  "Checking Gauge",
  "Fabrication",
  "Other",
];
