import { ArrowRight } from "lucide-react";
import { HeroCarousel } from "@/components/hero-carousel";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  coachingGoals,
  faqs,
  formatInr,
  packages,
  site,
  steps,
} from "@/lib/content";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <HeroCarousel />
      <div className="relative z-10 flex min-h-[100svh] items-end">
        <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-28 sm:px-6 sm:pb-32 sm:pt-32">
          <p className="animate-fade-up font-display text-4xl text-[#f7f3ed] sm:text-5xl md:text-6xl lg:text-7xl">
            {site.name}
          </p>
          <h1 className="animate-fade-up-delay-1 mt-4 max-w-2xl font-display text-2xl leading-snug text-[#f7f3ed]/95 text-balance sm:text-3xl md:text-4xl">
            {site.tagline}
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-lg text-base leading-relaxed text-[#f7f3ed]/80 sm:text-lg">
            Coaching for fitness, habits, resilience, confidence, and the clarity to take your
            next step — paced to a human life.
          </p>
          <div className="animate-fade-up-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-11 rounded-md bg-[#f7f3ed] px-6 text-sm font-medium text-[#24302a] hover:bg-[#ebe4d8]"
            >
              <a href="#waitlist">
                Join the waitlist
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-md border-[#f7f3ed]/35 bg-transparent px-6 text-sm font-medium text-[#f7f3ed] hover:bg-[#f7f3ed]/10 hover:text-[#f7f3ed]"
            >
              <a href="#packages">See packages</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionShell({
  id,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight text-[#24302a] text-balance sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function Goals() {
  return (
    <SectionShell
      id="goals"
      title="Five ways people find their way back"
      description="Choose the one that feels most true right now. We can braid others in later."
    >
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {coachingGoals.map((goal, index) => (
          <li key={goal.id} className="border-t border-[#d7d0c4] pt-5">
            <span className="text-xs tracking-[0.18em] text-[var(--ink-soft)] uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-2xl text-[#24302a]">{goal.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">{goal.body}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

export function Packages() {
  return (
    <SectionShell
      id="packages"
      title="Packages with clear prices and a gentle pace"
      description="Pay once for a season of support. No subscriptions. No hustle scoreboard."
      className="bg-[color-mix(in_srgb,var(--mist)_70%,transparent)]"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {packages.map((pkg) => (
          <article
            key={pkg.id}
            className={cn(
              "flex flex-col rounded-2xl border p-7 sm:p-8",
              pkg.highlight
                ? "border-[#3f5f4f]/35 bg-[#3f5f4f] text-[#f7f3ed]"
                : "border-[#d7d0c4] bg-[#faf7f2]/80 text-[#24302a]",
            )}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl sm:text-3xl">{pkg.name}</h3>
              {pkg.highlight ? (
                <span className="text-xs tracking-[0.14em] text-[#f7f3ed]/75 uppercase">
                  Most chosen
                </span>
              ) : null}
            </div>
            <p
              className={cn(
                "mt-3 text-[15px] leading-relaxed",
                pkg.highlight ? "text-[#f7f3ed]/80" : "text-[var(--ink-soft)]",
              )}
            >
              {pkg.summary}
            </p>
            <p className="mt-6 font-display text-3xl">
              {formatInr(pkg.price)}
              <span
                className={cn(
                  "ml-2 text-sm font-sans",
                  pkg.highlight ? "text-[#f7f3ed]/70" : "text-[var(--ink-soft)]",
                )}
              >
                · {pkg.duration}
              </span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5 text-[15px]">
              {pkg.includes.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span
                    className={cn(
                      "mt-2 size-1.5 shrink-0 rounded-full",
                      pkg.highlight ? "bg-[#f7f3ed]/80" : "bg-[#3f5f4f]",
                    )}
                  />
                  <span className={pkg.highlight ? "text-[#f7f3ed]/90" : "text-[#24302a]/85"}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className={cn(
                "mt-8 h-11 w-full rounded-md text-sm font-medium",
                pkg.highlight
                  ? "bg-[#f7f3ed] text-[#24302a] hover:bg-[#ebe4d8]"
                  : "bg-[#3f5f4f] text-[#f7f3ed] hover:bg-[#345043]",
              )}
            >
              <a href="#waitlist">Start with this path</a>
            </Button>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function HowItWorks() {
  return (
    <SectionShell
      id="how-it-works"
      title="How we walk together"
      description="No overwhelm. Four soft steps from where you are to a rhythm you can keep."
    >
      <ol className="grid gap-10 md:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step.title} className="relative pl-14">
            <span className="absolute top-0 left-0 font-display text-4xl text-[#3f5f4f]/35">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-2xl text-[#24302a]">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--ink-soft)]">{step.body}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

export function Faq() {
  return (
    <SectionShell
      id="faq"
      title="Questions people ask before beginning"
      className="bg-[color-mix(in_srgb,var(--mist)_55%,transparent)]"
    >
      <Accordion type="single" collapsible className="max-w-3xl">
        {faqs.map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`} className="border-[#d7d0c4]">
            <AccordionTrigger className="text-left font-display text-lg text-[#24302a] hover:no-underline sm:text-xl">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionShell>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d7d0c4] py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-display text-lg text-[#24302a]">{site.name}</span>
          {" · "}
          Coaching that is soothing to the eyes and the heart.
        </p>
        <p>Waitlist open. Discovery calls as seats free up.</p>
      </div>
    </footer>
  );
}
