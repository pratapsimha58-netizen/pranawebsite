import type { CoachingGoalId, Package } from "@/lib/content";
import { packages } from "@/lib/content";

export type GoalPageContent = {
  slug: string;
  goalId: CoachingGoalId;
  /** Related journal article slugs (may be drafts until published). */
  relatedArticles: string[];
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  directAnswer: string;
  forWhom: string[];
  notFor: string[];
  howItApplies: string;
  faqs: { q: string; a: string }[];
  coachNote: string;
  packageIds: string[];
};

export const goalPages: GoalPageContent[] = [
  {
    slug: "fitness-habits-coaching",
    goalId: "fitness",
    relatedArticles: [
      "rebuild-fitness-routine-after-months-off",
      "why-people-quit-habit-programs",
    ],
    title: "Fitness habits coaching",
    metaTitle: "Fitness habit coaching in Bengaluru & online",
    metaDescription:
      "Get back to fitness through sleep, movement, and energy you can keep — with ICF coach Pratap at Prana Way. Online and Bengaluru.",
    h1: "Get back to fitness — at a pace your life can hold",
    directAnswer:
      "If you have fallen off fitness and every restart collapses by week two, the fix is rarely more willpower. It is a gentler rhythm: sleep, movement, and energy designed for ordinary Indian workweeks — coached online or from Bengaluru with Pratap.",
    forWhom: [
      "Professionals who used to train and want to return without punishing themselves",
      "People whose sleep and energy have slipped, making workouts feel impossible",
      "Anyone tired of all-or-nothing plans that ignore family and work load",
    ],
    notFor: [
      "People seeking a personal trainer or bodybuilding programme",
      "Anyone needing medical or clinical advice for injury or illness {{TODO: owner review — medical disclaimer wording}}",
      "Those looking for a 30-day challenge or strict meal plan",
    ],
    howItApplies:
      "We start with what your week actually looks like, then build one or two practices you can keep — walking, sleep anchors, strength that fits a busy calendar. Sessions stay kind; the plan bends when life does.",
    faqs: [
      {
        q: "Do I need a gym for fitness habits coaching?",
        a: "No. Many clients rebuild with walking, home movement, and sleep first. Gym work can come later if it fits your life.",
      },
      {
        q: "How is this different from a fitness app?",
        a: "An app gives workouts. Coaching helps you notice what stops you, redesign the week, and stay accountable without shame when you miss a day.",
      },
      {
        q: "Can I do this while working long hours in Bengaluru?",
        a: "Yes. The plan is built around real weeks — commute, deadlines, family — not ideal ones. Most sessions are online so you can join from home or office.",
      },
      {
        q: "Which package fits getting back to fitness?",
        a: "Single Focus (₹30,000 / 3 weeks) works if fitness is your one priority. Steady Path (₹50,000 / 6 weeks) is better if sleep, stress, or habits are tangled with fitness.",
      },
    ],
    coachNote:
      "Pratap is an ICF-credentialed coach and NLP Practitioner with a background in people development. He helps clients rebuild body rhythm without hustle culture.",
    packageIds: ["single-focus", "steady-path"],
  },
  {
    slug: "break-bad-habits",
    goalId: "habits",
    relatedArticles: [
      "why-people-quit-habit-programs",
      "coaching-vs-therapy",
    ],
    title: "Break bad habits coaching",
    metaTitle: "Break bad habits — habit coach online India",
    metaDescription:
      "Replace draining habits with small practices that stick. Habit coaching with Pratap at Prana Way — online across India, rooted in Bengaluru.",
    h1: "Break the loops that keep coming back — kindly",
    directAnswer:
      "Bad habits that return after every reset are usually meeting a need — relief, reward, or rest. Habit coaching at Prana Way helps you replace those loops with smaller practices that fit ordinary days, not another streak you will abandon.",
    forWhom: [
      "People who know what they should stop but keep circling back",
      "Professionals whose evenings disappear into screens, snacking, or scrolling",
      "Anyone who has quit programmes that demanded perfection",
    ],
    notFor: [
      "Clinical addiction treatment — that needs specialised care {{TODO: owner review}}",
      "People wanting a rigid 21-day challenge with public accountability",
      "Anyone seeking medication or medical detox advice",
    ],
    howItApplies:
      "We map the cue and the need behind the habit, then design a softer replacement that still feels rewarding. Check-ins keep you honest without turning a slip into a failure story.",
    faqs: [
      {
        q: "Why do my bad habits keep coming back?",
        a: "Often because the habit still solves something — stress, boredom, loneliness. Removing it without a kinder substitute leaves the need unmet, so the loop returns.",
      },
      {
        q: "Will you force me to quit cold turkey?",
        a: "No. We favour gradual replacement that your nervous system can keep. Cold turkey works for some; for most busy adults, it collapses.",
      },
      {
        q: "Is habit coaching available online in India?",
        a: "Yes. Sessions are on Google Meet by default, so you can work with Pratap from anywhere while he is based in Bengaluru.",
      },
      {
        q: "Which package is right for breaking habits?",
        a: "Single Focus if one habit is the priority. Steady Path if several habits sit under stress, sleep, or confidence.",
      },
    ],
    coachNote:
      "With NLP Practitioner training and years in people development, Pratap helps you change behaviour without shame — the same skills that help teams form healthier rhythms at work.",
    packageIds: ["single-focus", "steady-path"],
  },
  {
    slug: "resilience-coaching",
    goalId: "resilience",
    relatedArticles: [
      "burnout-vs-busy-season",
      "coaching-vs-therapy",
    ],
    title: "Resilience coaching",
    metaTitle: "Resilience coaching for burnout & stress",
    metaDescription:
      "Build resilience for stress, setbacks, and busy seasons — without burning out. Online coaching with Pratap at Prana Way, Bengaluru.",
    h1: "Steady yourself when stress keeps knocking you off course",
    directAnswer:
      "Resilience coaching is for people who function under pressure but feel thinner each week. At Prana Way, Pratap helps you recover capacity — sleep, boundaries, and nervous-system steadiness — so setbacks stop wiping out your whole life.",
    forWhom: [
      "Professionals who are high-performing but running on empty",
      "People recovering from a hard season at work or at home",
      "Anyone who wants to handle stress without collapsing into bad habits",
    ],
    notFor: [
      "People in acute crisis who need immediate clinical or emergency support",
      "Anyone seeking therapy for trauma processing {{TODO: owner review — when to refer}}",
      "Those looking for motivational pep talks without practice",
    ],
    howItApplies:
      "We notice what depletes you, protect recovery pockets in the week, and build practices that settle your system. The four-step path stays the same: share where you are, discovery, a fitting package, then practice and return.",
    faqs: [
      {
        q: "Is resilience coaching the same as burnout leave?",
        a: "No. Coaching does not replace medical leave or therapy. It helps you rebuild sustainable rhythms if you are still able to work and want support.",
      },
      {
        q: "How do I know if I need coaching or therapy?",
        a: "If clinical symptoms, trauma, or mental-health diagnosis are primary, start with a qualified clinician. Coaching fits lifestyle, habits, and work stress when you want a practical partner. {{TODO: owner review}}",
      },
      {
        q: "Can resilience coaching help with work stress in India?",
        a: "Yes. Many clients are in Indian workplaces with long hours and high expectations. Sessions are online and paced to real calendars.",
      },
      {
        q: "Which package supports resilience?",
        a: "Steady Path (₹50,000 / 6 weeks) is usually the better fit when stress, sleep, and habits are intertwined. Single Focus works if resilience is your sole focus for three weeks.",
      },
    ],
    coachNote:
      "Pratap spent five years as Head of CX at Dunzo, scaling a team from 10 to about 1,000 with a focus on quality and training. He knows what sustained pressure looks like — and how people recover capacity.",
    packageIds: ["single-focus", "steady-path"],
  },
  {
    slug: "confidence-coaching",
    goalId: "confidence",
    relatedArticles: [
      "what-happens-in-a-discovery-call",
      "burnout-vs-busy-season",
    ],
    title: "Confidence coaching",
    metaTitle: "Confidence coaching for professionals",
    metaDescription:
      "Regain quiet confidence after a hard phase — for yourself and the people who look to you. Coaching with Pratap at Prana Way.",
    h1: "Become the role model again — without forcing a persona",
    directAnswer:
      "Confidence coaching at Prana Way is for people who used to feel solid and then lost that quiet self-trust. Pratap helps you rebuild presence through small practices — not fake bravado — so you can show up for yourself and those who look to you.",
    forWhom: [
      "Professionals who feel they have lost their edge after a hard phase",
      "Parents or leaders who want to model steadiness again",
      "People whose confidence dropped with fitness, habits, or career shifts",
    ],
    notFor: [
      "Anyone seeking stage-presence training or sales hype",
      "People who need clinical support for anxiety disorders {{TODO: owner review}}",
      "Those wanting overnight transformation without weekly practice",
    ],
    howItApplies:
      "We name where confidence thinned, practise small acts of self-trust, and link them to your week. Often confidence returns when sleep, habits, and boundaries improve — so we may braid goals gently.",
    faqs: [
      {
        q: "What does confidence coaching actually change?",
        a: "It changes how you meet hard moments: clearer self-talk, smaller kept promises, and presence that feels like you again — not a louder performance.",
      },
      {
        q: "Is this the same as executive coaching?",
        a: "It can support professionals at work, but the focus is whole-life confidence and role-modelling, not only boardroom performance.",
      },
      {
        q: "Do you coach confidence online?",
        a: "Yes. Most sessions are on Google Meet. Pratap is based in Bengaluru and works with clients across India and abroad.",
      },
      {
        q: "Which package fits confidence work?",
        a: "Single Focus or Steady Path for personal confidence. First Client if confidence is tied to offering your coaching gift and booking a paid client.",
      },
    ],
    coachNote:
      "Pratap brings ICF coaching, NLP practice, and 10+ years in HR and people development — helping people find their footing after seasons that shook their self-trust.",
    packageIds: ["single-focus", "steady-path", "first-client"],
  },
  {
    slug: "first-coaching-client",
    goalId: "clarity",
    relatedArticles: [
      "how-new-coaches-book-first-client",
      "what-happens-in-a-discovery-call",
    ],
    title: "First coaching client",
    metaTitle: "How to get your first coaching client",
    metaDescription:
      "Clarity, courage, and structure to invite your first paying coaching client — with Pratap at Prana Way. For new coaches in India and online.",
    h1: "Book your first paying coaching client — with clarity and courage",
    directAnswer:
      "New coaches often stall between training and the first paid invitation. The First Client path at Prana Way gives you offer clarity, soft-invite practice, and session structure so you can ask — and hold — your first paying client conversation.",
    forWhom: [
      "Trained or training coaches who have not yet booked a paid client",
      "People with a skill or story who want to offer it as coaching",
      "Coaches who freeze at outreach and need practised, kind language",
    ],
    notFor: [
      "Anyone seeking a full ICF coach-training programme",
      "People who want lead-generation ads or aggressive funnel tactics",
      "Those not ready to have real conversations with potential clients",
    ],
    howItApplies:
      "We clarify your offer in plain language, practise soft invites, and structure your first client call. Eight sessions over four weeks keep momentum without hustle theatre.",
    faqs: [
      {
        q: "Who is the First Client path for?",
        a: "People who already have a skill or story to offer and want clarity, courage, and structure to invite their first paying client. It is not a full coach-training programme.",
      },
      {
        q: "Do you guarantee I will get a client?",
        a: "{{TODO: owner review — state guarantee policy; default: no guarantee of a booked client, focus on readiness and practise}}.",
      },
      {
        q: "Is this only for coaches in India?",
        a: "No. Sessions are online. The voice is calm and India-rooted; clients can be anywhere.",
      },
      {
        q: "What does the First Client package cost?",
        a: "₹30,000 for four weeks: eight sessions, offer clarity, outreach practise, and a next-90-days sketch after your first client conversation.",
      },
      {
        q: "Can I combine this with confidence coaching?",
        a: "Often yes — confidence and first-client clarity reinforce each other. We choose the primary path on the discovery call.",
      },
    ],
    coachNote:
      "Pratap is an ICF-credentialed coach who also understands people development and organisational growth. He supports new coaches to take the first paid step without losing their humanity.",
    packageIds: ["first-client", "single-focus"],
  },
];

export function getGoalPage(slug: string): GoalPageContent | undefined {
  return goalPages.find((g) => g.slug === slug);
}

export function getGoalByGoalId(goalId: CoachingGoalId): GoalPageContent | undefined {
  return goalPages.find((g) => g.goalId === goalId);
}

export function packagesForGoal(goal: GoalPageContent): Package[] {
  return goal.packageIds
    .map((id) => packages.find((p) => p.id === id))
    .filter((p): p is Package => Boolean(p));
}

/** Homepage card → goal page route */
export const goalHrefById: Record<CoachingGoalId, string> = {
  fitness: "/fitness-habits-coaching",
  habits: "/break-bad-habits",
  resilience: "/resilience-coaching",
  confidence: "/confidence-coaching",
  clarity: "/first-coaching-client",
};
