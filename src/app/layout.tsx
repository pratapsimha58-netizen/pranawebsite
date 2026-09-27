import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

/** CohereText fallback */
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Unica77 Cohere Web fallback */
const unica = Inter({
  variable: "--font-unica",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/** CohereMono fallback */
const mono = JetBrains_Mono({
  variable: "--font-mono-label",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name}: ${site.tagline}`,
  description: site.description,
  openGraph: {
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${unica.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
