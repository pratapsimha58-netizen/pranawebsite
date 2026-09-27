/**
 * Single source of truth for brand, SEO, and social identity.
 * Keep wording identical everywhere this is imported.
 */
export const site = {
  name: "Prana Way",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thepranaway.com",
  tagline: "Come back to yourself, gently.",
  description:
    "One-to-one coaching in Bengaluru and online for fitness, better habits, resilience, confidence, and booking your first coaching client — with ICF-credentialed coach Pratap.",
  person: {
    /** {{TODO: confirm full name as it should appear publicly}} */
    name: "Pratap",
    fullName: "{{TODO: full name}}",
    jobTitle: "ICF-Credentialed Coach",
    /** {{TODO: owner to supply a real headshot at public/images/pratap.jpg}} */
    image: "/images/pratap.jpg",
  },
  locale: "en_IN",
  city: "Bengaluru",
  country: "IN",
  social: {
    /** {{TODO: LinkedIn profile URL}} */
    linkedin: "{{TODO}}",
    /** {{TODO: Instagram URL, e.g. https://instagram.com/coachpratapsimha}} */
    instagram: "{{TODO}}",
    /** {{TODO: YouTube channel URL}} */
    youtube: "{{TODO}}",
  },
  /**
   * {{TODO: owner to decide how "Prana Way" relates to "Vantage Point" / @coachpratapsimha}}
   * Until decided, Prana Way is the brand and Pratap is the person.
   */
  brandNote:
    "Prana Way is the coaching practice; Pratap is the coach. Brand relationship to Vantage Point TBD.",
  verification: {
    /** {{TODO: Google Search Console verification code}} */
    google: "{{TODO: verification code}}",
  },
  analytics: {
    /** {{TODO: which analytics — Netlify Analytics, Plausible, or GA4}} */
    provider: "{{TODO: which one}}",
  },
} as const;

export type SiteConfig = typeof site;
