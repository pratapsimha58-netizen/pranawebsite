import { SiteHeader } from "@/components/site-header";
import {
  BeforeAfter,
  Faq,
  Guarantees,
  Hero,
  HowItWorks,
  Packages,
  SiteFooter,
} from "@/components/sections";
import { WaitlistForm } from "@/components/waitlist-form";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Packages />
        <BeforeAfter />
        <Guarantees />
        <Faq />
        <section id="waitlist" className="scroll-mt-20 border-t bg-muted/40 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-primary">Waitlist</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Start with a free ATS score
              </h2>
              <p className="mt-3 text-muted-foreground">
                Join the waitlist and we will collect your current resume. Within 24 hours
                you get a parse score and three specific fixes, free. If you want the full
                rewrite, the first 10 paid orders get founding-customer pricing.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>Takes under a minute.</li>
                <li>Your details are used only to reach you about this service.</li>
                <li>Unsubscribe with a single reply.</li>
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
