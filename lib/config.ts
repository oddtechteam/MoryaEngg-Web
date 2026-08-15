/**
 * Central site configuration. Values are sourced from environment variables
 * where provided, falling back to the details from the official company
 * profile. Update the .env.local values to change these without touching code.
 */

export const siteConfig = {
  name: "Morya Engineering Works",
  shortName: "Morya",
  tagline: "Precision Engineering • Manufacturing • Tool Room Solutions",
  established: "August 2019",
  establishedYear: 2019,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://moryaengineeringworks.com",

  // Contact
  phones: [
    { label: "Mobile", number: "9860569697" },
    { label: "Mobile", number: "8830412741" },
  ],
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "moryaengineering1011@gmail.com",

  // WhatsApp — set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local (with country code, no + or spaces)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919860569697",

  // Location
  address: {
    line1: "Sr. No. 681/1, Gavhane Industrial Estate",
    line2: "Near Jio Office, Landewadi",
    line3: "Bhosari MIDC, Pune – 411039",
    full: "Sr. No. 681/1, Gavhane Industrial Estate, Near Jio Office, Landewadi, Bhosari MIDC, Pune – 411039, Maharashtra, India",
  },

  // Configure via NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL to replace with an exact pinned embed URL
  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
    "https://www.google.com/maps?q=Bhosari+MIDC,+Landewadi,+Pune,+Maharashtra+411039&output=embed",
  mapsDirectionsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL ||
    "https://www.google.com/maps/dir/?api=1&destination=Bhosari+MIDC,+Landewadi,+Pune,+Maharashtra+411039",
};

export const whatsappUrl = (message?: string) => {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
