import {
  ArrowRight,
  CheckCircle2,
  Clock,
  IndianRupee,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  audience,
  beforeAfter,
  faqs,
  formatInr,
  guarantees,
  packages,
  site,
  steps,
} from "@/lib/content";
import { cn } from "@/lib/utils";

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  dark,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p
            className={cn(
              "font-mono text-[14px] tracking-[0.28px] uppercase",
              dark ? "text-[#ffad9b]" : "text-[#75758a]",
            )}
          >
            {eyebrow}
          </p>
          <h2
            className={cn(
              "mt-4 font-[family-name:var(--font-display)] text-[36px] font-normal leading-[1.1] tracking-[-0.48px] sm:text-[48px]",
              dark ? "text-white" : "text-[#000000]",
            )}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={cn(
                "mt-4 text-[16px] leading-[1.5] sm:text-[18px] sm:leading-[1.4]",
                dark ? "text-white/75" : "text-[#616161]",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-24 sm:pb-14">
        <p className="font-mono text-[14px] tracking-[0.28px] text-[#75758a] uppercase">
          Career services for India
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl font-[family-name:var(--font-display)] text-[48px] font-normal leading-[1] tracking-[-1.44px] text-[#000000] sm:text-[72px] sm:tracking-[-1.92px] lg:text-[88px]">
          {site.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-[1.5] text-[#616161] sm:text-[18px] sm:leading-[1.4]">
          {site.description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            className="h-auto rounded-full bg-[#17171c] px-6 py-3 text-[14px] font-medium text-white hover:bg-[#000000]"
          >
            <a href="#waitlist">
              Get a free ATS score
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <a
            href="#packages"
            className="text-[16px] text-[#212121] underline underline-offset-4 decoration-[#d9d9dd] hover:decoration-[#1863dc] hover:text-[#1863dc]"
          >
            Explore packages
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-4 px-4 pb-20 sm:px-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[22px] bg-[#003c33] p-8 text-left text-white sm:p-10">
          <p className="font-mono text-[14px] tracking-[0.28px] text-[#edfce9]/70 uppercase">
            Built for
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-[28px] font-normal tracking-[-0.32px] sm:text-[32px]">
            Job switchers, not job seekers in general
          </h2>
          <ul className="mt-8 space-y-3.5 text-[15px] leading-[1.5] text-white/80">
            {audience.map((item) => (
              <li key={item} className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#ffad9b]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {[
            { label: "Turnaround", value: "3 days", icon: Clock },
            { label: "Packages from", value: formatInr(2499), icon: IndianRupee },
            { label: "Call-back guarantee", value: "45 days", icon: ShieldCheck },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[22px] border border-[#f2f2f2] bg-[#eeece7] p-6"
            >
              <stat.icon className="size-4 text-[#75758a]" />
              <p className="mt-4 text-[13px] text-[#75758a]">{stat.label}</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-[28px] font-normal tracking-[-0.32px] text-[#000000]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="Four steps, two calls, three working days"
      description="The process is the product. Every step exists because it changes what a recruiter sees."
      className="bg-[#eeece7]"
    >
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t border-[#d9d9dd] pt-6">
            <span className="font-mono text-[14px] tracking-[0.28px] text-[#ff7759]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-[24px] font-normal leading-[1.3] text-[#000000]">
              {step.title}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.5] text-[#616161]">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Packages() {
  return (
    <Section
      id="packages"
      eyebrow="Packages and pricing"
      title="Fixed price, fixed turnaround, no subscription"
      description="Pay once per switch. Most people choose Resume + LinkedIn; the sprint is for a planned move with a deadline."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={cn(
              "flex flex-col rounded-[8px] p-8",
              pkg.highlight
                ? "bg-[#003c33] text-white"
                : "bg-[#eeece7] text-[#212121]",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[24px] font-normal leading-[1.3]">{pkg.name}</h3>
              {pkg.highlight ? (
                <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[12px] tracking-[0.28px] text-[#ffad9b] uppercase">
                  Most chosen
                </span>
              ) : null}
            </div>
            <p
              className={cn(
                "mt-3 text-[15px] leading-[1.5]",
                pkg.highlight ? "text-white/70" : "text-[#616161]",
              )}
            >
              {pkg.summary}
            </p>
            <div className="my-6 border-t border-current/10" />
            <p>
              <span className="font-[family-name:var(--font-display)] text-[32px] font-normal tracking-[-0.32px]">
                {formatInr(pkg.price)}
              </span>
              <span
                className={cn(
                  "ml-1 text-[13px]",
                  pkg.highlight ? "text-white/60" : "text-[#93939f]",
                )}
              >
                one-time
              </span>
            </p>
            <p
              className={cn(
                "mt-1 flex items-center gap-1.5 text-[13px]",
                pkg.highlight ? "text-white/60" : "text-[#93939f]",
              )}
            >
              <Clock className="size-3.5" /> {pkg.turnaround}
            </p>
            <ul className="mt-6 flex-1 space-y-2.5 text-[14px]">
              {pkg.includes.map((line) => (
                <li key={line} className="flex gap-2">
                  <CheckCircle2
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      pkg.highlight ? "text-[#ffad9b]" : "text-[#003c33]",
                    )}
                  />
                  <span className={pkg.highlight ? "text-white/85" : "text-[#616161]"}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className={cn(
                "mt-8 h-auto rounded-full px-6 py-3 text-[14px] font-medium",
                pkg.highlight
                  ? "bg-white text-[#17171c] hover:bg-[#edfce9]"
                  : "bg-[#17171c] text-white hover:bg-[#000000]",
              )}
            >
              <a href="#waitlist">Join the waitlist</a>
            </Button>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[14px] text-[#93939f]">
        Add-ons from {formatInr(499)}: cover letter, Naukri profile optimisation, extra
        revision round, 24-hour express, salary negotiation call.
      </p>
    </Section>
  );
}

export function BeforeAfter() {
  return (
    <Section
      id="sample"
      eyebrow="Before and after"
      title="Same engineer, same job. Different resume."
      description={`${beforeAfter.role}. Names and client details changed with permission.`}
      className="bg-[#003c33]"
      dark
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[22px] border border-white/10 bg-[#002922] p-8">
          <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[12px] tracking-[0.28px] text-white/50 uppercase">
            Before
          </span>
          <p className="mt-5 text-[18px] text-white/50">Duties, no numbers, no ownership</p>
          <ul className="mt-6 space-y-3 font-mono text-[13px] leading-[1.55] text-white/45">
            {beforeAfter.before.map((line) => (
              <li key={line} className="flex gap-2">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-white/25" />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[22px] bg-[#eeece7] p-8 text-[#212121]">
          <span className="rounded-full bg-[#ff7759]/15 px-3 py-1 font-mono text-[12px] tracking-[0.28px] text-[#ff7759] uppercase">
            After
          </span>
          <p className="mt-5 text-[18px] text-[#000000]">Scope, action, measurable result</p>
          <ul className="mt-6 space-y-3 font-mono text-[13px] leading-[1.55] text-[#616161]">
            {beforeAfter.after.map((line) => (
              <li key={line} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#003c33]" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function Guarantees() {
  return (
    <Section
      eyebrow="Guarantees"
      title="Small promises we can keep every time"
      description="We do not promise you a job. We promise the things that are in our control."
    >
      <div className="grid gap-8 md:grid-cols-3">
        {guarantees.map((item, index) => {
          const Icon = [ShieldCheck, Clock, UserRound][index] ?? ShieldCheck;
          return (
            <div key={item.title} className="border-t border-[#d9d9dd] pt-6">
              <Icon className="size-5 text-[#003c33]" />
              <h3 className="mt-5 text-[24px] font-normal leading-[1.3] text-[#000000]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.5] text-[#616161]">{item.body}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Questions people ask before paying"
      className="bg-[#f1f5ff]"
    >
      <Accordion type="single" collapsible className="max-w-3xl">
        {faqs.map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`} className="border-[#d9d9dd]">
            <AccordionTrigger className="text-left text-[18px] font-normal text-[#000000] hover:no-underline hover:text-[#1863dc]">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-[1.5] text-[#616161]">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#17171c] py-16 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 text-[14px] text-[#93939f] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-[family-name:var(--font-display)] text-white">
            {site.name}
          </span>
          {" · "}
          Resume, LinkedIn and interview prep for job switchers in India.
        </p>
        <p>Waitlist only for now. First 10 customers get founding-customer pricing.</p>
      </div>
    </footer>
  );
}
