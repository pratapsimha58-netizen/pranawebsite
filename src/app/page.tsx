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
        <section id="waitlist" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-10 rounded-xl bg-primary p-8 text-primary-foreground sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:p-16">
              <div>
                <p className="text-[12px] font-semibold tracking-[1.5px] uppercase">
                  Waitlist
                </p>
                <h2 className="mt-3 text-[32px] font-bold tracking-[-1px] sm:text-[40px] sm:tracking-[-1.5px]">
                  Start with a free ATS score
                </h2>
                <p className="mt-4 text-[16px] leading-[1.55] text-[#0a0a0a]/80">
                  Join the waitlist and we will collect your current resume. Within 24 hours
                  you get a parse score and three specific fixes, free. If you want the full
                  rewrite, the first 10 paid orders get founding-customer pricing.
                </p>
                <ul className="mt-6 space-y-2 text-[14px] text-[#0a0a0a]/75">
                  <li>Takes under a minute.</li>
                  <li>Your details are used only to reach you about this service.</li>
                  <li>Unsubscribe with a single reply.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-[#0a0a0a]/10 bg-[#0a0a0a] p-6 text-white shadow-none sm:p-8">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
