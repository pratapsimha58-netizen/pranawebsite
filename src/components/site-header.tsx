import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

const nav = [
  { href: "#goals", label: "Goals" },
  { href: "#packages", label: "Packages" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-[#f7f3ed] sm:text-2xl"
        >
          {site.name}
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-[#f7f3ed]/80 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[#f7f3ed]">
              {item.label}
            </a>
          ))}
        </nav>
        <Button
          asChild
          className="h-10 rounded-md bg-[#f7f3ed] px-4 text-sm font-medium text-[#24302a] hover:bg-[#ebe4d8]"
        >
          <a href="#waitlist">Begin gently</a>
        </Button>
      </div>
    </header>
  );
}
