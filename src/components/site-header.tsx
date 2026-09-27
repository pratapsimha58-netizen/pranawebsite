import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const homeNav = [
  { href: "#goals", label: "Goals" },
  { href: "#packages", label: "Packages" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

const siteNav = [
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
];

export function SiteHeader({
  variant = "hero",
}: {
  variant?: "hero" | "solid";
}) {
  const isHero = variant === "hero";

  return (
    <header
      className={cn(
        isHero
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 border-b border-[#d7d0c4]/80 bg-[#f7f3ed]/95 backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link
          href="/"
          className={cn(
            "font-display text-xl tracking-tight sm:text-2xl",
            isHero ? "text-[#f7f3ed]" : "text-[#24302a]",
          )}
        >
          {site.name}
        </Link>
        <nav
          className={cn(
            "hidden items-center gap-8 text-sm md:flex",
            isHero ? "text-[#f7f3ed]/80" : "text-[var(--ink-soft)]",
          )}
        >
          {isHero
            ? homeNav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition",
                    isHero ? "hover:text-[#f7f3ed]" : "hover:text-[#24302a]",
                  )}
                >
                  {item.label}
                </a>
              ))
            : null}
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition",
                isHero ? "hover:text-[#f7f3ed]" : "hover:text-[#24302a]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          asChild
          className={cn(
            "h-10 rounded-md px-4 text-sm font-medium",
            isHero
              ? "bg-[#f7f3ed] text-[#24302a] hover:bg-[#ebe4d8]"
              : "bg-[#3f5f4f] text-[#f7f3ed] hover:bg-[#345043]",
          )}
        >
          <Link href={isHero ? "#waitlist" : "/#waitlist"}>Begin gently</Link>
        </Button>
      </div>
    </header>
  );
}
