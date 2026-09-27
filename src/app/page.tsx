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
        <section id="waitlist" className="scroll-mt-20 bg-[#eeece7] px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="font-mono text-[14px] tracking-[0.28px] text-[#ff7759] uppercase">
                Waitlist
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[36px] font-normal leading-[1.1] tracking-[-0.48px] text-[#000000] sm:text-[48px]">
                Start with a free ATS score
              </h2>
              <p className="mt-4 text-[16px] leading-[1.5] text-[#616161] sm:text-[18px]">
                Join the waitlist and we will collect your current resume. Within 24 hours
                you get a parse score and three specific fixes, free. If you want the full
                rewrite, the first 10 paid orders get founding-customer pricing.
              </p>
              <ul className="mt-6 space-y-2 text-[14px] text-[#75758a]">
                <li>Takes under a minute.</li>
                <li>Your details are used only to reach you about this service.</li>
                <li>Unsubscribe with a single reply.</li>
              </ul>
            </div>
            <div className="rounded-[22px] border border-[#d9d9dd] bg-white p-6 sm:p-8">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
