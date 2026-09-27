import { site as siteConfig } from "@/lib/site";

/** Re-export so existing imports of `site` from content keep working. */
export const site = {
  name: siteConfig.name,
  tagline: siteConfig.tagline,
  description: siteConfig.description,
  url: siteConfig.url,
};

export const coachingGoals = [
  {
    id: "fitness",
    title: "Get back to fitness",
    body: "Rebuild a body rhythm you can keep — sleep, movement, and energy that feel like yours again.",
  },
  {
    id: "habits",
    title: "Get rid of bad habits",
    body: "Replace the loops that drain you with small, kind practices that stick on ordinary days.",
  },
  {
    id: "resilience",
    title: "Build resilience",
    body: "Steady your nervous system so stress, setbacks, and busy seasons stop knocking you off course.",
  },
  {
    id: "confidence",
    title: "Become the role model again",
    body: "Regain the quiet confidence you used to carry — for yourself, and for the people who look to you.",
  },
  {
    id: "clarity",
    title: "Gain clarity and book your first client",
    body: "Find your offer, your voice, and the courage to invite your first paying client.",
  },
] as const;

export const coachingGoalOptions = [
  "fitness",
  "habits",
  "resilience",
  "confidence",
  "clarity",
] as const;

export type CoachingGoalId = (typeof coachingGoalOptions)[number];

export const goalLabels: Record<CoachingGoalId, string> = {
  fitness: "Get back to fitness",
  habits: "Get rid of bad habits",
  resilience: "Build resilience",
  confidence: "Become the role model again",
  clarity: "Gain clarity and book your first client",
};

export type Package = {
  id: string;
  name: string;
  price: number;
  duration: string;
  summary: string;
  includes: string[];
  highlight?: boolean;
  goals: CoachingGoalId[];
};

export const packages: Package[] = [
  {
    id: "single-focus",
    name: "Single Focus",
    price: 30000,
    duration: "3 weeks",
    summary: "One goal. Clear weekly rhythm. Gentle accountability.",
    goals: ["fitness", "habits", "resilience", "confidence", "clarity"],
    includes: [
      "Discovery call to choose your primary goal",
      "Six coaching sessions over three weeks",
      "A simple weekly practice plan",
      "WhatsApp check-ins between sessions",
    ],
  },
  {
    id: "steady-path",
    name: "Steady Path",
    price: 50000,
    duration: "6 weeks",
    summary: "The most chosen path — two or three goals woven into one habit of life.",
    highlight: true,
    goals: ["fitness", "habits", "resilience", "confidence"],
    includes: [
      "Everything in Single Focus",
      "Twelve sessions over six weeks",
      "Habit and energy tracking that stays light",
      "A mid-path reset call with someone you trust",
      "Personal role-model practices for hard days",
    ],
  },
  {
    id: "first-client",
    name: "First Client",
    price: 30000,
    duration: "4 weeks",
    summary: "For people ready to offer their gift and book their first paid client.",
    goals: ["clarity", "confidence"],
    includes: [
      "Offer clarity and positioning in plain language",
      "Eight coaching sessions",
      "Script and soft-invite practice for outreach",
      "Session structure for your first client call",
      "Celebration and next-90-days sketch",
    ],
  },
];

export const steps = [
  {
    title: "Share where you are",
    body: "Join the waitlist and tell us which goal is calling you. No long form. No pressure.",
  },
  {
    title: "A quiet discovery call",
    body: "Thirty minutes to listen — what feels heavy, what you miss about yourself, and what “better” would feel like.",
  },
  {
    title: "A path that fits your life",
    body: "We choose a package and a weekly rhythm you can keep even when work and family are full.",
  },
  {
    title: "Practice, reflect, return",
    body: "Sessions, small practices, and check-ins that keep you moving without burning you out.",
  },
];

export const faqs = [
  {
    q: "Is this therapy?",
    a: "No. This is coaching for lifestyle, habits, confidence, and clarity. If clinical support is what you need, we will say so kindly and point you toward it.",
  },
  {
    q: "How online or in-person is this?",
    a: "Sessions are on Google Meet by default. In-person is possible in select cities when both of us can meet without strain.",
  },
  {
    q: "I have tried programs before and quit. Will this be different?",
    a: "We design for ordinary weeks, not perfect ones. The plan bends when life does — that is the point.",
  },
  {
    q: "Who is the First Client path for?",
    a: "People who already have a skill or story to offer and want clarity, courage, and structure to invite their first paying client.",
  },
  {
    q: "What happens after I join the waitlist?",
    a: "You get a short personal note within 48 hours, then a link to book a discovery call when a seat opens.",
  },
];

/** Soft atmospheric slides for the home carousel — calm light, nature, human presence. */
export const heroSlides = [
  {
    id: "dawn",
    alt: "Mountain ridgeline at dawn with soft peach and blue light, suggesting a gentle new beginning",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80",
    caption: "Begin again in soft light",
  },
  {
    id: "breath",
    alt: "Calm ocean shoreline at golden hour with quiet waves and warm sky",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80",
    caption: "Let the rush fall away",
  },
  {
    id: "path",
    alt: "Quiet forest path with gentle mist filtering through tall trees",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=80",
    caption: "Walk back toward yourself",
  },
  {
    id: "warmth",
    alt: "Open fields under warm sunlight with soft rolling hills in the distance",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2400&q=80",
    caption: "Steady, human, unhurried",
  },
];

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
