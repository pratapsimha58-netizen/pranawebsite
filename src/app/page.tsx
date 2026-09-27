import { SiteHeader } from "@/components/site-header";
import { AboutCoach, Testimonials } from "@/components/about";
import {
  Faq,
  Goals,
  Hero,
  HowItWorks,
  Packages,
  SiteFooter,
} from "@/components/sections";
import { WaitlistForm } from "@/components/waitlist-form";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/lib/content";
import { buildFaqPage, buildServiceOffers } from "@/lib/seo/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [...buildServiceOffers(), buildFaqPage(faqs)],
        }}
      />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Goals />
        <Packages />
        <HowItWorks />
        <AboutCoach />
        <Testimonials />
        <Faq />
        <section id="waitlist" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="font-display text-3xl text-[#24302a] text-balance sm:text-4xl md:text-5xl">
                Begin when you are ready
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
                Tell us your name, email, and the goal that is calling you. We will reply
                within forty-eight hours with a calm next step — no pressure, no drip
                sequence.
              </p>
              <ul className="mt-8 space-y-2 text-sm text-[var(--ink-soft)]">
                <li>Takes under a minute.</li>
                <li>Your details are only used to reach you about coaching.</li>
                <li>Unsubscribe with a single reply.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#d7d0c4] bg-[#faf7f2]/90 p-6 sm:p-8">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
