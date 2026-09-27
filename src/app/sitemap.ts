import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedJournalSlugs } from "@/lib/journal";

const staticRoutes = [
  "/",
  "/about",
  "/journal",
  "/fitness-habits-coaching",
  "/break-bad-habits",
  "/resilience-coaching",
  "/confidence-coaching",
  "/first-coaching-client",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/journal") ? 0.6 : 0.8,
  }));

  for (const slug of getPublishedJournalSlugs()) {
    pages.push({
      url: `${site.url}/journal/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return pages;
}
