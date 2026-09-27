import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/sections";
import { JsonLd } from "@/components/json-ld";
import { aboutPage, credentials } from "@/lib/about";
import { site } from "@/lib/site";
import { buildBreadcrumbs } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "About Pratap",
  description:
    "Meet Pratap, ICF-credentialed coach behind Prana Way in Bengaluru — coaching online for fitness, habits, resilience, confidence, and first clients.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Pratap | Prana Way",
    description:
      "ICF-credentialed coaching in Bengaluru and online. People development background, Dunzo CX leadership, calm coaching for real life.",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <SiteHeader variant="solid" />
      <main className="flex-1">
        <section className="border-b border-[#d7d0c4] bg-[color-mix(in_srgb,var(--mist)_50%,transparent)] px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs tracking-[0.16em] text-[var(--ink-soft)] uppercase">
              About
            </p>
            <h1 className="mt-3 font-display text-4xl text-[#24302a] text-balance sm:text-5xl">
              {aboutPage.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--ink-soft)]">
              {aboutPage.intro}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {credentials.map((item) => (
                <li
                  key={item}
                  className="border border-[#d7d0c4] bg-[#faf7f2] px-3 py-1.5 text-xs text-[#24302a]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
            {aboutPage.story.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="bg-[color-mix(in_srgb,var(--mist)_55%,transparent)] px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl text-[#24302a]">How we work</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              {aboutPage.approach}
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-3xl gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-[#24302a]">Who this is for</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                {aboutPage.forWhom.map((item) => (
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
                {aboutPage.notFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 bg-[#c4a574]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <Link
              href="/#waitlist"
              className="inline-flex h-11 items-center bg-[#3f5f4f] px-6 text-sm font-semibold text-[#f7f3ed] hover:bg-[#345043]"
            >
              Join the waitlist
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
