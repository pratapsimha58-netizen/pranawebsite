export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  draft?: boolean;
  goal?: "fitness" | "habits" | "resilience" | "confidence" | "clarity";
  body: string;
};

/**
 * Journal posts live as typed content for static generation.
 * Drafts (draft: true) are excluded from listings and the sitemap.
 */
export const journalPosts: JournalPost[] = [];

export function getPublishedJournalPosts(): JournalPost[] {
  return journalPosts
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPublishedJournalSlugs(): string[] {
  return getPublishedJournalPosts().map((post) => post.slug);
}

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((post) => post.slug === slug);
}
