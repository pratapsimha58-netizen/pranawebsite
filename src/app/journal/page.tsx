import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import { getPublishedJournalPosts, readingTimeMinutes } from "@/lib/journal";
import { site } from "@/lib/site";
import { buildBreadcrumbs } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Gentle essays on habits, fitness, resilience, confidence, and booking your first coaching client — from Prana Way.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: `Journal | ${site.name}`,
    description:
      "Articles on habit change, coaching, and coming back to yourself — written for search and for people.",
    url: `${site.url}/journal`,
  },
};

export default function JournalIndexPage() {
  const posts = getPublishedJournalPosts();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ])}
      />
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <section className="border-b border-[#d7d0c4] bg-[color-mix(in_srgb,var(--mist)_50%,transparent)] px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs tracking-[0.16em] text-[var(--ink-soft)] uppercase">
              Journal
            </p>
            <h1 className="mt-3 font-display text-4xl text-[#24302a] sm:text-5xl">
              Notes for coming back to yourself
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              Short, quotable pieces on habits, fitness, resilience, confidence, and first
              clients — written in the same calm voice as the coaching.
            </p>
            <p className="mt-3 text-sm text-[var(--ink-soft)]">
              <a
                href="/journal/rss.xml"
                className="underline-offset-4 hover:underline"
              >
                RSS feed
              </a>
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            {posts.length === 0 ? (
              <div className="border border-[#d7d0c4] bg-[#faf7f2]/80 p-8">
                <h2 className="font-display text-2xl text-[#24302a]">
                  Articles are on the way
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
                  Draft pieces are being finished. Meanwhile, explore the coaching paths or
                  read about Pratap.
                </p>
                <ul className="mt-6 flex flex-wrap gap-4 text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="text-[#3f5f4f] underline-offset-4 hover:underline"
                    >
                      About Pratap
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/fitness-habits-coaching"
                      className="text-[#3f5f4f] underline-offset-4 hover:underline"
                    >
                      Fitness habits coaching
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#waitlist"
                      className="text-[#3f5f4f] underline-offset-4 hover:underline"
                    >
                      Join the waitlist
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <ul className="divide-y divide-[#d7d0c4] border-y border-[#d7d0c4]">
                {posts.map((post) => (
                  <li key={post.slug} className="py-8">
                    <p className="text-xs text-[var(--ink-soft)]">
                      {post.date}
                      {" · "}
                      {readingTimeMinutes(post.body)} min read
                    </p>
                    <h2 className="mt-2 font-display text-2xl text-[#24302a]">
                      <Link
                        href={`/journal/${post.slug}`}
                        className="transition hover:text-[#3f5f4f]"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                      {post.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
