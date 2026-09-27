import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import {
  getJournalPostForPage,
  getPublishedJournalSlugs,
  goalPathForJournal,
  readingTimeMinutes,
  renderJournalMarkdown,
} from "@/lib/journal";
import { site } from "@/lib/site";
import { buildArticleSchema, buildBreadcrumbs } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostForPage(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      title: `${post.title} | ${site.name}`,
      description: post.description,
      url: `${site.url}/journal/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalPostForPage(slug);
  if (!post) notFound();

  const goalPath = goalPathForJournal(post.goal);
  const html = renderJournalMarkdown(post.body);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            buildBreadcrumbs([
              { name: "Home", path: "/" },
              { name: "Journal", path: "/journal" },
              { name: post.title, path: `/journal/${post.slug}` },
            ]),
            buildArticleSchema({
              title: post.title,
              description: post.description,
              path: `/journal/${post.slug}`,
              datePublished: post.date,
              dateModified: post.updated ?? post.date,
            }),
          ],
        }}
      />
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <article className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs tracking-[0.14em] text-[var(--ink-soft)] uppercase">
              Journal
            </p>
            <h1 className="mt-3 font-display text-4xl text-[#24302a] text-balance sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-[var(--ink-soft)]">
              By{" "}
              <Link href="/about" className="underline-offset-4 hover:underline">
                {site.person.name}
              </Link>
              {" · "}
              <time dateTime={post.date}>{post.date}</time>
              {" · "}
              {readingTimeMinutes(post.body)} min read
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[var(--ink-soft)]">
              {post.description}
            </p>
            <div
              className="journal-prose mt-10 space-y-4 text-base leading-relaxed text-[var(--ink-soft)] [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-[#24302a] [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-[#24302a] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {goalPath ? (
              <aside className="mt-14 border-t border-[#d7d0c4] pt-8">
                <h2 className="font-display text-2xl text-[#24302a]">When coaching helps</h2>
                <p className="mt-3 text-[15px] text-[var(--ink-soft)]">
                  If this question is alive for you, explore the related coaching path or join
                  the waitlist for a calm next step.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <Link
                    href={goalPath}
                    className="font-medium text-[#3f5f4f] underline-offset-4 hover:underline"
                  >
                    Related coaching path
                  </Link>
                  <Link
                    href="/#waitlist"
                    className="font-medium text-[#3f5f4f] underline-offset-4 hover:underline"
                  >
                    Join the waitlist
                  </Link>
                </div>
              </aside>
            ) : null}

            <aside className="mt-12 border border-[#d7d0c4] bg-[#faf7f2]/90 p-6">
              <p className="text-xs tracking-[0.14em] text-[var(--ink-soft)] uppercase">
                Author
              </p>
              <h2 className="mt-2 font-display text-xl text-[#24302a]">
                {site.person.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                {site.person.jobTitle} at {site.name}. Based in {site.city}; coaching online.
              </p>
              <Link
                href="/about"
                className="mt-3 inline-flex text-sm font-medium text-[#3f5f4f] underline-offset-4 hover:underline"
              >
                More about Pratap
              </Link>
            </aside>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
