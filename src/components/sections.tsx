import {
  ArrowRight,
  CheckCircle2,
  Clock,
  IndianRupee,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-16 sm:py-24", className)}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[12px] font-semibold tracking-[1.5px] text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-[32px] font-bold tracking-[-1px] text-white sm:text-[40px] sm:tracking-[-1.5px]">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-[16px] leading-[1.55] text-[#cccccc]">{description}</p>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section className="border-b border-[#2a2a2a]">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div>
          <Badge className="mb-5 rounded-full border-0 bg-primary px-3 py-1 text-[12px] font-semibold tracking-[1.5px] text-primary-foreground uppercase">
            Get started
          </Badge>
          <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1.5px] text-white sm:text-[56px] sm:tracking-[-2px] lg:text-[64px] lg:leading-[1.05] lg:tracking-[-2.5px]">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.55] text-[#cccccc] sm:text-[18px]">
            {site.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-10 rounded-md px-5 text-[14px] font-semibold">
              <a href="#waitlist">
                Get a free ATS score
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="h-10 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-5 text-[14px] font-semibold text-white hover:bg-[#242424]"
            >
              <a href="#packages">See packages and pricing</a>
            </Button>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <dt className="flex items-center gap-1.5 text-[13px] font-medium text-[#888888]">
                <Clock className="size-3.5" /> Turnaround
              </dt>
              <dd className="mt-1 text-[28px] font-bold tracking-[-1px] text-primary sm:text-[36px]">
                3d
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[13px] font-medium text-[#888888]">
                <IndianRupee className="size-3.5" /> From
              </dt>
              <dd className="mt-1 text-[28px] font-bold tracking-[-1px] text-primary sm:text-[36px]">
                {formatInr(2499)}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-[13px] font-medium text-[#888888]">
                <ShieldCheck className="size-3.5" /> Guarantee
              </dt>
              <dd className="mt-1 text-[28px] font-bold tracking-[-1px] text-primary sm:text-[36px]">
                45d
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 sm:p-8">
          <p className="text-[12px] font-semibold tracking-[1.5px] text-[#888888] uppercase">
            Built for
          </p>
          <h2 className="mt-2 text-[18px] font-semibold text-white">
            Job switchers, not job seekers in general
          </h2>
          <ul className="mt-6 space-y-3.5 text-[14px] leading-[1.55] text-[#cccccc]">
            {audience.map((item) => (
              <li key={item} className="flex gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-[#2a2a2a] pt-5 text-[13px] text-[#888888]">
            Freshers and senior leaders need a different product. We will tell you rather
            than sell you the wrong thing.
          </p>
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
      className="bg-[#121212]"
    >
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 sm:p-8"
          >
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-[14px] font-bold text-primary-foreground">
              {index + 1}
            </span>
            <h3 className="mt-5 text-[16px] font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-[14px] leading-[1.55] text-[#cccccc]">{step.body}</p>
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
              "flex flex-col rounded-xl p-6 sm:p-8",
              pkg.highlight
                ? "bg-primary text-primary-foreground"
                : "border border-[#2a2a2a] bg-[#1a1a1a] text-white",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[18px] font-semibold">{pkg.name}</h3>
              {pkg.highlight ? (
                <span className="rounded-full bg-[#0a0a0a] px-2.5 py-0.5 text-[12px] font-semibold tracking-[1px] text-primary uppercase">
                  Most chosen
                </span>
              ) : null}
            </div>
            <p
              className={cn(
                "mt-2 text-[14px] leading-[1.55]",
                pkg.highlight ? "text-[#0a0a0a]/80" : "text-[#cccccc]",
              )}
            >
              {pkg.summary}
            </p>
            <p className="mt-5">
              <span className="text-[32px] font-bold tracking-[-1px]">
                {formatInr(pkg.price)}
              </span>
              <span
                className={cn(
                  "ml-1 text-[13px]",
                  pkg.highlight ? "text-[#0a0a0a]/70" : "text-[#888888]",
                )}
              >
                one-time
              </span>
            </p>
            <p
              className={cn(
                "mt-1 flex items-center gap-1.5 text-[13px]",
                pkg.highlight ? "text-[#0a0a0a]/70" : "text-[#888888]",
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
                      pkg.highlight ? "text-[#0a0a0a]" : "text-primary",
                    )}
                  />
                  <span className={pkg.highlight ? "text-[#0a0a0a]" : "text-[#cccccc]"}>
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className={cn(
                "mt-8 h-10 w-full rounded-md text-[14px] font-semibold",
                pkg.highlight
                  ? "bg-[#0a0a0a] text-white hover:bg-[#1a1a1a]"
                  : "bg-primary text-primary-foreground hover:bg-[#e6eb52]",
              )}
            >
              <a href="#waitlist">Join the waitlist</a>
            </Button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[13px] text-[#888888]">
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
      className="bg-[#121212]"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-[#2a2a2a] border-dashed bg-[#1a1a1a] p-6 sm:p-8">
          <span className="rounded-full bg-[#242424] px-3 py-1 text-[13px] font-medium text-[#888888]">
            Before
          </span>
          <p className="mt-4 text-[16px] font-semibold text-[#888888]">
            Duties, no numbers, no ownership
          </p>
          <ul className="mt-5 space-y-3 font-mono text-[13px] leading-[1.55] text-[#888888]">
            {beforeAfter.before.map((line) => (
              <li key={line} className="flex gap-2">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#5a5a5a]" />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 sm:p-8">
          <span className="rounded-full bg-primary px-3 py-1 text-[12px] font-semibold tracking-[1.5px] text-primary-foreground uppercase">
            After
          </span>
          <p className="mt-4 text-[16px] font-semibold text-white">
            Scope, action, measurable result
          </p>
          <ul className="mt-5 space-y-3 font-mono text-[13px] leading-[1.55] text-[#e6e6e6]">
            {beforeAfter.after.map((line) => (
              <li key={line} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
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
      <div className="grid gap-4 md:grid-cols-3">
        {guarantees.map((item, index) => {
          const Icon = [ShieldCheck, Clock, UserRound][index] ?? ShieldCheck;
          return (
            <div
              key={item.title}
              className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 sm:p-8"
            >
              <Icon className="size-6 text-primary" />
              <h3 className="mt-4 text-[16px] font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-[#cccccc]">{item.body}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions people ask before paying" className="bg-[#121212]">
      <Accordion type="single" collapsible className="max-w-3xl">
        {faqs.map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`} className="border-[#2a2a2a]">
            <AccordionTrigger className="text-left text-[16px] font-semibold text-white hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-[14px] leading-[1.55] text-[#cccccc]">
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
    <footer className="border-t border-[#2a2a2a] bg-[#0a0a0a] py-16">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 text-[14px] text-[#888888] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-semibold text-white">{site.name}</span>
          {" · "}
          Resume, LinkedIn and interview prep for job switchers in India.
        </p>
        <p>Waitlist only for now. First 10 customers get founding-customer pricing.</p>
      </div>
    </footer>
  );
}
