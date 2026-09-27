import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWebinarStore } from "@/db/webinar-store";
import { coachingGoals, site, type CoachingGoalId } from "@/lib/content";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const webinar = await getWebinarStore().getBySlug(slug);
  if (!webinar || !webinar.published) {
    return { title: `Webinar | ${site.name}` };
  }
  return {
    title: `${webinar.title} | ${site.name}`,
    description: webinar.summary,
  };
}

export default async function WebinarPage({ params }: { params: Params }) {
  const { slug } = await params;
  const webinar = await getWebinarStore().getBySlug(slug);
  if (!webinar || !webinar.published) notFound();

  const goalMeta = (webinar.goals as string[])
    .map((id) => coachingGoals.find((g) => g.id === (id as CoachingGoalId)))
    .filter(Boolean);

  return (
    <main className="flex-1">
      <section className="relative min-h-[70svh] overflow-hidden bg-[#24302a]">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 20%, #6b9a96 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, #3f5f4f 0%, transparent 45%)",
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-20">
          <Link
            href="/"
            className="font-display text-2xl text-[#f7f3ed]/90 sm:text-3xl"
          >
            {site.name}
          </Link>
          <p className="mt-8 text-xs tracking-[0.18em] text-[#f7f3ed]/65 uppercase">
            Live webinar
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight text-[#f7f3ed] text-balance sm:text-5xl">
            {webinar.title}
          </h1>
          {webinar.subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#f7f3ed]/80 sm:text-lg">
              {webinar.subtitle}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#f7f3ed]/75">
            <span>{webinar.scheduledLabel ?? "Date to be announced"}</span>
            <span>{webinar.duration ?? "60 minutes"}</span>
            <span>Hosted by {webinar.hostName}</span>
          </div>
          <div className="mt-8">
            <Button
              asChild
              className="h-11 rounded-md bg-[#f7f3ed] px-6 text-sm font-medium text-[#24302a] hover:bg-[#ebe4d8]"
            >
              <a href="#register">
                {webinar.ctaLabel}
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
          {webinar.heroCaption ? (
            <p className="mt-10 font-display text-lg text-[#f7f3ed]/70">
              {webinar.heroCaption}
            </p>
          ) : null}
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-3xl text-[#24302a] sm:text-4xl">
              What this evening holds
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              {webinar.summary}
            </p>
            {goalMeta.length ? (
              <ul className="mt-8 space-y-4">
                {goalMeta.map((goal) =>
                  goal ? (
                    <li key={goal.id} className="border-t border-[#d7d0c4] pt-4">
                      <h3 className="font-display text-xl text-[#24302a]">{goal.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                        {goal.body}
                      </p>
                    </li>
                  ) : null,
                )}
              </ul>
            ) : null}
          </div>
          <div>
            <h2 className="font-display text-3xl text-[#24302a]">You will leave with</h2>
            <ul className="mt-6 space-y-3">
              {(webinar.takeaways as string[]).map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-[#24302a]/85">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#3f5f4f]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[color-mix(in_srgb,var(--mist)_65%,transparent)] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl text-[#24302a] sm:text-4xl">Flow</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2">
            {(webinar.agenda as string[]).map((item, index) => (
              <li key={item} className="relative pl-14">
                <span className="absolute top-0 left-0 font-display text-4xl text-[#3f5f4f]/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="pt-2 text-[15px] leading-relaxed text-[#24302a]">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="register" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl text-[#24302a] text-balance sm:text-4xl">
            Save your seat
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--ink-soft)]">
            Join the Prana Way waitlist and mention this webinar. We will send the link and
            a calm reminder before we begin.
          </p>
          <Button
            asChild
            className="mt-8 h-11 rounded-md bg-[#3f5f4f] px-6 text-sm font-medium text-[#f7f3ed] hover:bg-[#345043]"
          >
            <Link href={`/?utm_source=webinar-${webinar.slug}#waitlist`}>
              {webinar.ctaLabel}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-[#d7d0c4] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link href="/" className="font-display text-lg text-[#24302a]">
            {site.name}
          </Link>
          <p>Webinar pages grow from the studio at /admin/webinars.</p>
        </div>
      </footer>
    </main>
  );
}
