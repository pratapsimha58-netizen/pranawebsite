/**
 * Analytics helpers. Default: GA4 (see site.analytics).
 * Override with NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible|ga4|netlify.
 */

import { site } from "@/lib/site";

export type AnalyticsProvider = "none" | "plausible" | "ga4" | "netlify";

export function getAnalyticsProvider(): AnalyticsProvider {
  const raw = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.toLowerCase();
  if (raw === "plausible" || raw === "ga4" || raw === "netlify") return raw;
  if (site.analytics.provider === "ga4" || site.analytics.provider === "netlify") {
    return site.analytics.provider;
  }
  return "none";
}

export function getGa4Id(): string | undefined {
  const fromEnv = process.env.NEXT_PUBLIC_GA4_ID;
  if (fromEnv && !fromEnv.startsWith("{{") && !fromEnv.startsWith("G-TODO")) {
    return fromEnv;
  }
  const fromSite = site.analytics.ga4Id;
  if (fromSite && fromSite.startsWith("G-")) return fromSite;
  return undefined;
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a conversion when someone joins the waitlist (includes goal). */
export function trackWaitlistSubmit(primaryGoal: string) {
  if (typeof window === "undefined") return;
  const provider = getAnalyticsProvider();

  if (provider === "plausible" && typeof window.plausible === "function") {
    window.plausible("Waitlist Submit", { props: { goal: primaryGoal } });
    return;
  }

  if (provider === "ga4" && typeof window.gtag === "function") {
    window.gtag("event", "waitlist_submit", {
      event_category: "conversion",
      primary_goal: primaryGoal,
    });
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics] waitlist_submit", { primaryGoal, provider });
  }
}
