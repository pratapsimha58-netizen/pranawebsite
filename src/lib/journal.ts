import fs from "node:fs";
import path from "node:path";

export type JournalGoal = "fitness" | "habits" | "resilience" | "confidence" | "clarity";

export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  draft?: boolean;
  goal?: JournalGoal;
  /** Raw markdown body (without frontmatter). */
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "journal");

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  if (!raw.startsWith("---")) {
    return { data: {}, body: raw.trim() };
  }
  const end = raw.indexOf("---", 3);
  if (end === -1) return { data: {}, body: raw.trim() };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 3).trim();
  const data: Record<string, string> = {};
  for (const line of fm.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body };
}

function loadAllPosts(): JournalPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? "1970-01-01",
        updated: data.updated || undefined,
        draft: data.draft === "true",
        goal: (data.goal as JournalGoal | undefined) || undefined,
        body,
      } satisfies JournalPost;
    });
}

let cache: JournalPost[] | null = null;

export function getAllJournalPosts(): JournalPost[] {
  if (!cache) cache = loadAllPosts();
  return cache;
}

export function getPublishedJournalPosts(): JournalPost[] {
  return getAllJournalPosts()
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedJournalSlugs(): string[] {
  return getPublishedJournalPosts().map((post) => post.slug);
}

export function getJournalPost(slug: string): JournalPost | undefined {
  return getAllJournalPosts().find((post) => post.slug === slug);
}

/** Drafts are loadable by slug for preview; listings exclude them. */
export function getJournalPostForPage(slug: string): JournalPost | undefined {
  const post = getJournalPost(slug);
  if (!post || post.draft) return undefined;
  return post;
}

export function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Minimal markdown → HTML for journal bodies.
 * Supports headings, paragraphs, and unordered lists. No raw HTML passthrough.
 */
export function renderJournalMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listItems.length) {
      html.push(`<ul>${listItems.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`);
      listItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmed.slice(2));
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  return html.join("\n");
}

function inline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-[#3f5f4f] underline-offset-4 hover:underline">$1</a>',
    );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function goalPathForJournal(
  goal?: JournalGoal,
): string | undefined {
  if (!goal) return undefined;
  const map: Record<JournalGoal, string> = {
    fitness: "/fitness-habits-coaching",
    habits: "/break-bad-habits",
    resilience: "/resilience-coaching",
    confidence: "/confidence-coaching",
    clarity: "/first-coaching-client",
  };
  return map[goal];
}
