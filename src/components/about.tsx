import Link from "next/link";
import { aboutHome, credentials, testimonials } from "@/lib/about";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function AboutCoach() {
  return (
    <section id="about-pratap" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden border border-[#d7d0c4] bg-[#e7efe9]">
            {/* Photo optional until a real headshot exists at public/images/pratap.jpg */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_30%_20%,#f7f3ed_0%,#e7efe9_55%,#d5e0d8_100%)] p-6 text-center">
              <span className="font-display text-3xl text-[#24302a]">{site.person.name}</span>
              <span className="mt-2 text-xs tracking-[0.14em] text-[var(--ink-soft)] uppercase">
                {site.person.jobTitle}
              </span>
            </div>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
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
        <div>
          <p className="text-xs tracking-[0.16em] text-[var(--ink-soft)] uppercase">
            {aboutHome.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-[#24302a] sm:text-4xl md:text-5xl">
            {aboutHome.title}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
            {aboutHome.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-8 inline-block text-sm font-medium text-[#3f5f4f] underline-offset-4 hover:underline"
          >
            Read the full story
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  if (testimonials.length < 2) return null;

  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl text-[#24302a] sm:text-4xl">
          Words from people who walked this path
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote
              key={item.name + item.quote.slice(0, 20)}
              className={cn("border border-[#d7d0c4] bg-[#faf7f2] p-6 sm:p-8")}
            >
              <p className="text-[15px] leading-relaxed text-[#24302a]/90">“{item.quote}”</p>
              <footer className="mt-4 text-sm text-[var(--ink-soft)]">
                <span className="font-medium text-[#24302a]">{item.name}</span>
                {" · "}
                {item.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
