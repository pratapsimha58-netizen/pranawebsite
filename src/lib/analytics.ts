/**
 * Privacy-friendly analytics helpers.
 * {{TODO: which analytics — Netlify Analytics, Plausible, or GA4}}
 * Until a provider is chosen, events are no-ops in production unless
 * NEXT_PUBLIC_ANALYTICS_PROVIDER is set.
 */

export type AnalyticsProvider = "none" | "plausible" | "ga4" | "netlify";

export function getAnalyticsProvider(): AnalyticsProvider {
  const raw = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.toLowerCase();
  if (raw === "plausible" || raw === "ga4" || raw === "netlify") return raw;
  return "none";
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

  // Netlify Analytics does not support custom events in the free snippet;
  // goal is still stored server-side on the waitlist row.
  if (process.env.NODE_ENV === "development") {
    console.info("[analytics] waitlist_submit", { primaryGoal, provider });
  }
}
