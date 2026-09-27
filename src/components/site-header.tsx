import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

const nav = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#packages", label: "Packages" },
  { href: "#sample", label: "Sample" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d9d9dd] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[15px] font-medium tracking-[-0.02em] text-[#000000]"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-[#17171c] text-[11px] font-medium text-white">
            SR
          </span>
          {site.name}
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-[14px] text-[#212121] md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[#1863dc]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button
          asChild
          className="h-auto rounded-full bg-[#17171c] px-6 py-3 text-[14px] font-medium text-white hover:bg-[#000000]"
        >
          <a href="#waitlist">Get a free ATS score</a>
        </Button>
      </div>
    </header>
  );
}
