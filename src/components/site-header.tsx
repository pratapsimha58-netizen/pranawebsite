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
    <header className="sticky top-0 z-40 border-b border-[#2a2a2a] bg-[#0a0a0a]">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-[14px] font-semibold text-white">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            SR
          </span>
          {site.name}
        </Link>
        <nav className="hidden items-center gap-7 text-[14px] font-medium text-[#888888] md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button asChild className="h-10 rounded-md px-5 text-[14px] font-semibold">
          <a href="#waitlist">Get a free ATS score</a>
        </Button>
      </div>
    </header>
  );
}
