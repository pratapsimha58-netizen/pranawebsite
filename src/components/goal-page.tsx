import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/sections";
import { WaitlistForm } from "@/components/waitlist-form";
import { JsonLd } from "@/components/json-ld";
import { formatInr, steps } from "@/lib/content";
import type { GoalPageContent } from "@/lib/goals";
import { packagesForGoal } from "@/lib/goals";
import { site } from "@/lib/site";
import { buildBreadcrumbs, buildFaqPage } from "@/lib/seo/schema";
import { getPublishedJournalPosts } from "@/lib/journal";

export function GoalPageView({ goal }: { goal: GoalPageContent }) {
  const pkgs = packagesForGoal(goal);
  const related = getPublishedJournalPosts().filter((post) =>
    goal.relatedArticles.includes(post.slug),
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            buildBreadcrumbs([
              { name: "Home", path: "/" },
              { name: goal.title, path: `/${goal.slug}` },
            ]),
            buildFaqPage(goal.faqs),
          ],
        }}
      />
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <section className="border-b border-[#d7d0c4] bg-[color-mix(in_srgb,var(--mist)_50%,transparent)] px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs tracking-[0.16em] text-[var(--ink-soft)] uppercase">
              {site.name} · {site.city} & online
            </p>
            <h1 className="mt-3 font-display text-4xl text-[#24302a] text-balance sm:text-5xl">
              {goal.h1}
            </h1>
            <div className="mt-8 border-l-2 border-[#3f5f4f] pl-5">
              <p className="text-xs tracking-[0.14em] text-[var(--ink-soft)] uppercase">
                The short answer
              </p>
              <p className="mt-2 text-base leading-relaxed text-[#24302a] sm:text-lg">
                {goal.directAnswer}
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-3xl gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-[#24302a]">Who this is for</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                {goal.forWhom.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 bg-[#3f5f4f]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl text-[#24302a]">Who this is not for</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                {goal.notFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 bg-[#c4a574]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-[color-mix(in_srgb,var(--mist)_55%,transparent)] px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-[#24302a]">
              How coaching works for this goal
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              {goal.howItApplies}
            </p>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2">
              {steps.map((step, index) => (
                <li key={step.title} className="relative pl-12">
                  <span className="absolute top-0 left-0 font-display text-3xl text-[#3f5f4f]/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-[#24302a]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-[#24302a]">Packages that fit</h2>
            <p className="mt-3 text-base text-[var(--ink-soft)]">
              Clear prices in INR. No subscriptions. No hustle scoreboard.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {pkgs.map((pkg) => (
                <article
                  key={pkg.id}
                  className="border border-[#d7d0c4] bg-[#faf7f2]/90 p-6"
                >
                  <h3 className="font-display text-2xl text-[#24302a]">{pkg.name}</h3>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">{pkg.summary}</p>
                  <p className="mt-4 font-display text-2xl text-[#3f5f4f]">
                    {formatInr(pkg.price)}
                    <span className="ml-2 text-sm font-sans text-[var(--ink-soft)]">
                      · {pkg.duration}
                    </span>
                  </p>
                  <a
                    href="#waitlist"
                    className="mt-5 inline-flex text-sm font-medium text-[#3f5f4f] underline-offset-4 hover:underline"
                  >
                    Join the waitlist for {pkg.name}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[color-mix(in_srgb,var(--mist)_55%,transparent)] px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-[#24302a]">Questions about this path</h2>
            <div className="mt-8 divide-y divide-[#d7d0c4] border-y border-[#d7d0c4]">
              {goal.faqs.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="cursor-pointer list-none font-display text-lg text-[#24302a] marker:content-none sm:text-xl [&::-webkit-details-marker]:hidden">
                    <span className="flex items-start justify-between gap-4">
                      {item.q}
                      <span className="mt-1 text-sm text-[var(--ink-soft)] transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl text-[#24302a]">About your coach</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              {goal.coachNote}
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex text-sm font-medium text-[#3f5f4f] underline-offset-4 hover:underline"
            >
              Read more about Pratap
            </Link>
            {related.length > 0 ? (
              <div className="mt-10">
                <h3 className="font-display text-xl text-[#24302a]">Related reading</h3>
                <ul className="mt-3 space-y-2">
                  {related.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/journal/${post.slug}`}
                        className="text-sm text-[#3f5f4f] underline-offset-4 hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : goal.relatedArticles.length > 0 ? (
              <div className="mt-10">
                <h3 className="font-display text-xl text-[#24302a]">Related reading</h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  Journal drafts linked to this path will appear here when published.{" "}
                  <Link href="/journal" className="text-[#3f5f4f] underline-offset-4 hover:underline">
                    Visit the journal
                  </Link>
                  .
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section id="waitlist" className="scroll-mt-24 border-t border-[#d7d0c4] px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-3xl text-[#24302a] sm:text-4xl">
                Begin when you are ready
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--ink-soft)]">
                Your primary goal is pre-selected for this page. Tell us your name and email; we
                reply within forty-eight hours.
              </p>
            </div>
            <div className="rounded-2xl border border-[#d7d0c4] bg-[#faf7f2]/90 p-6 sm:p-8">
              <WaitlistForm defaultGoal={goal.goalId} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
