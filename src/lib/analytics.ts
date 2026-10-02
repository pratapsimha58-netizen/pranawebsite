/**
 * Privacy-friendly analytics helpers.
 * Default site choice: Netlify Analytics (enable in the Netlify dashboard).
 * Override with NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible|ga4 plus the matching public IDs.
 */

export type AnalyticsProvider = "none" | "plausible" | "ga4" | "netlify";

export function getAnalyticsProvider(): AnalyticsProvider {
  const raw = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER?.toLowerCase();
  if (raw === "plausible" || raw === "ga4" || raw === "netlify") return raw;
  // Site default when no env override is set
  return "netlify";
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
