import { coachingGoals, type CoachingGoalId } from "@/lib/content";
import type { NewWebinar } from "@/db/schema";

export type WebinarDraft = Omit<NewWebinar, "id" | "createdAt" | "published"> & {
  published?: boolean;
};

const goalMatchers: { id: CoachingGoalId; needles: RegExp }[] = [
  { id: "fitness", needles: /fitness|workout|health|body|energy|sleep|movement/i },
  { id: "habits", needles: /habit|addiction|routine|discipline|loop/i },
  { id: "resilience", needles: /resilien|stress|burnout|nervous|calm|anxiety/i },
  { id: "confidence", needles: /confidence|role model|self-worth|esteem|presence/i },
  {
    id: "clarity",
    needles: /clarity|client|offer|business|coach|positioning|first client/i,
  },
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function firstSentence(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const match = cleaned.match(/^(.+?[.!?])(?:\s|$)/);
  return (match?.[1] ?? cleaned).slice(0, 200);
}

function extractTitle(brief: string): string {
  const lines = brief
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const titled = lines.find((l) => /^(title|webinar|topic)\s*[:\-]/i.test(l));
  if (titled) {
    return titled.replace(/^(title|webinar|topic)\s*[:\-]\s*/i, "").slice(0, 120);
  }
  const first = lines[0] ?? "An evening with Prana Way";
  if (first.length <= 90) return first.replace(/[.!?]+$/, "");
  return firstSentence(first).replace(/[.!?]+$/, "").slice(0, 90);
}

function extractSchedule(brief: string): string | undefined {
  const patterns = [
    /(?:on|date|when)\s*[:\-]?\s*(\d{1,2}\s+[A-Za-z]+(?:\s+\d{4})?(?:\s*(?:at|@)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm|IST|ist)?)?)/i,
    /(?:on|date|when)\s*[:\-]?\s*([A-Za-z]+\s+\d{1,2}(?:,?\s*\d{4})?(?:\s*(?:at|@)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm|IST|ist)?)?)/i,
    /(\d{1,2}\s+[A-Za-z]+(?:\s+\d{4})?(?:\s*(?:at|@)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm|IST|ist)?)?)/i,
    /((?:mon|tue|wed|thu|fri|sat|sun)[a-z]*\s+\d{1,2}(?:\s*(?:at|@)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?)/i,
  ];
  for (const pattern of patterns) {
    const match = brief.match(pattern);
    if (match?.[1]) return match[1].trim().slice(0, 120);
  }
  return undefined;
}

function extractDuration(brief: string): string {
  const match = brief.match(/(\d{1,2})\s*(?:minute|min|hour|hr)s?/i);
  if (!match) return "60 minutes";
  const n = match[1];
  return /hour|hr/i.test(match[0]) ? `${n} hour${n === "1" ? "" : "s"}` : `${n} minutes`;
}

function extractHost(brief: string): string {
  const match = brief.match(
    /(?:host|with|by|speaker)\s*[:\-]?\s*([A-Za-z][A-Za-z.'\-]+(?:\s+[A-Za-z][A-Za-z.'\-]+)?)/i,
  );
  return match?.[1]?.slice(0, 120) ?? "Prana Way";
}

function detectGoals(brief: string): CoachingGoalId[] {
  const found = goalMatchers.filter((g) => g.needles.test(brief)).map((g) => g.id);
  if (found.length) return found.slice(0, 3);
  return ["resilience", "confidence"];
}

function buildAgenda(title: string, goals: CoachingGoalId[]): string[] {
  const goalTitles = goals.map(
    (id) => coachingGoals.find((g) => g.id === id)?.title ?? id,
  );
  return [
    "Arrive and settle — a short grounding so the room feels safe",
    `Open the theme: ${title}`,
    ...goalTitles.slice(0, 2).map((g) => `A gentle practice around “${g}”`),
    "Live Q&A — bring the question you have been carrying",
    "One clear next step you can keep this week",
  ].slice(0, 5);
}

function buildTakeaways(goals: CoachingGoalId[]): string[] {
  const map: Record<CoachingGoalId, string> = {
    fitness: "A body rhythm you can restart without an all-or-nothing plan",
    habits: "One loop to loosen, and a kinder replacement for ordinary days",
    resilience: "A stress reset you can use before the week hardens",
    confidence: "Language and posture that remind you who you are becoming",
    clarity: "A sharper sentence for your offer — and who to invite first",
  };
  return goals.map((id) => map[id]);
}

/**
 * Turns a freeform brief into a Prana Way webinar page draft.
 * Runs on the site (no Cursor Cloud backend). Optional LLM keys can be
 * layered later without changing the page shape.
 */
export function generateWebinarFromBrief(briefRaw: string): WebinarDraft {
  const brief = briefRaw.trim();
  if (brief.length < 12) {
    throw new Error("Tell me a little more about the webinar (at least a sentence).");
  }

  const title = extractTitle(brief);
  const goals = detectGoals(brief);
  const primaryGoal = coachingGoals.find((g) => g.id === goals[0]);
  const slugBase = slugify(title) || "prana-webinar";
  const scheduledLabel = extractSchedule(brief);
  const duration = extractDuration(brief);
  const hostName = extractHost(brief);

  const summary =
    brief.length > 40 && brief.length < 420
      ? brief.replace(/\s+/g, " ").trim()
      : `A live Prana Way session on ${title.toLowerCase()}. We will move gently, speak plainly, and leave you with one practice you can keep — not a pile of homework.`;

  const subtitle =
    primaryGoal?.body ??
    "Come as you are. Leave with one clear step your nervous system can trust.";

  return {
    slug: slugBase,
    title,
    subtitle: subtitle.slice(0, 280),
    summary: summary.slice(0, 2000),
    scheduledLabel: scheduledLabel ?? "Date to be announced",
    duration,
    hostName,
    agenda: buildAgenda(title, goals),
    takeaways: buildTakeaways(goals),
    goals,
    ctaLabel: "Save my seat",
    heroCaption: "A quiet room. A honest conversation.",
    brief,
    published: true,
  };
}

export function withUniqueSlug(base: string, existing: string[]): string {
  const taken = new Set(existing);
  if (!taken.has(base)) return base;
  for (let i = 2; i < 100; i++) {
    const candidate = `${base}-${i}`;
    if (!taken.has(candidate)) return candidate;
  }
  return `${base}-${Date.now().toString(36)}`;
}
