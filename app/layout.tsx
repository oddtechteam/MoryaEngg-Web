import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import FloatingActions from "@/components/FloatingActions";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const title = "Morya Engineering Works | CNC Machining, Tool Room & Precision Engineering";
const description =
  "Morya Engineering Works provides tool room engineering, CNC machining, jigs & fixtures, sheet metal press tools, checking gauges and precision manufacturing solutions in Pune.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  keywords: [
    "CNC machining Pune",
    "VMC machining",
    "tool room engineering",
    "sheet metal press tools",
    "jigs and fixtures manufacturer",
    "checking gauge manufacturer",
    "Bhosari MIDC engineering company",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/company/cnc-worker.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/company/cnc-worker.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/company/me-logo.png`,
  image: `${siteConfig.url}/images/company/cnc-worker.jpg`,
  telephone: `+91${siteConfig.phones[0].number}`,
  email: siteConfig.email,
  foundingDate: "2019-08",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sr. No. 681/1, Gavhane Industrial Estate, Landewadi",
    addressLocality: "Bhosari, Pune",
    addressRegion: "Maharashtra",
    postalCode: "411039",
    addressCountry: "IN",
  },
  areaServed: "IN",
  knowsAbout: [
    "CNC Machining",
    "VMC Machining",
    "Tool Room Engineering",
    "Sheet Metal Press Tools",
    "Jigs & Fixtures",
    "Checking Gauges",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${plexMono.variable} h-full`}>
      <body className="min-h-full bg-bg text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScrollProvider>
          <CustomCursor />
          <div className="noise-overlay" />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingActions />
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
