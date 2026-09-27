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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <section id={id} className={cn("scroll-mt-20 py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-linear-to-b from-primary/10 to-transparent"
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Badge variant="secondary" className="mb-4">
            For Indian professionals with 2-8 years of experience
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {site.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#waitlist">
                Get a free ATS score
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#packages">See packages and pricing</a>
            </Button>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="size-4" /> Turnaround
              </dt>
              <dd className="mt-1 font-semibold">3 working days</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <IndianRupee className="size-4" /> From
              </dt>
              <dd className="mt-1 font-semibold">{formatInr(2499)}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <ShieldCheck className="size-4" /> Guarantee
              </dt>
              <dd className="mt-1 font-semibold">45-day call-back</dd>
            </div>
          </dl>
        </div>
        <Card className="lg:justify-self-end lg:w-full">
          <CardHeader>
            <CardDescription>Who this is built for</CardDescription>
            <CardTitle className="text-xl">Job switchers, not job seekers in general</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {audience.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Freshers and senior leaders need a different product. We will tell you
            rather than sell you the wrong thing.
          </CardFooter>
        </Card>
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
    >
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="relative rounded-xl border bg-card p-6">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <h3 className="mt-4 font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
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
      className="bg-muted/40"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={cn(
              "flex flex-col",
              pkg.highlight && "border-primary shadow-lg ring-1 ring-primary/30",
            )}
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                {pkg.highlight ? <Badge>Most chosen</Badge> : null}
              </div>
              <CardDescription>{pkg.summary}</CardDescription>
              <p className="pt-2">
                <span className="text-3xl font-semibold tracking-tight">
                  {formatInr(pkg.price)}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">one-time</span>
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" /> {pkg.turnaround}
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-2.5 text-sm">
                {pkg.includes.map((line) => (
                  <li key={line} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full"
                variant={pkg.highlight ? "default" : "outline"}
              >
                <a href="#waitlist">Join the waitlist</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Add-ons from {formatInr(499)}: cover letter, Naukri profile optimisation, extra
        revision round, 24-hour express, salary negotiation call. Prices include
        payment fees; GST is not charged while we are under the registration threshold.
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
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-dashed">
          <CardHeader>
            <Badge variant="outline" className="w-fit">
              Before
            </Badge>
            <CardTitle className="text-base font-medium text-muted-foreground">
              Duties, no numbers, no ownership
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {beforeAfter.before.map((line) => (
                <li key={line} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                  {line}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-primary/40">
          <CardHeader>
            <Badge className="w-fit">After</Badge>
            <CardTitle className="text-base font-medium">
              Scope, action, measurable result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {beforeAfter.after.map((line) => (
                <li key={line} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {line}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
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
      className="bg-muted/40"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {guarantees.map((item, index) => {
          const Icon = [ShieldCheck, Clock, UserRound][index] ?? ShieldCheck;
          return (
            <div key={item.title} className="rounded-xl border bg-card p-6">
              <Icon className="size-6 text-primary" />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
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
    >
      <Accordion type="single" collapsible className="max-w-3xl">
        {faqs.map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
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
    <footer className="border-t py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {site.name}. Resume, LinkedIn and interview prep for job switchers in India.
        </p>
        <p>
          Waitlist only for now. First 10 customers get founding-customer pricing.
        </p>
      </div>
    </footer>
  );
}
