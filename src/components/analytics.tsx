import Script from "next/script";
import { getAnalyticsProvider, getGa4Id } from "@/lib/analytics";

/**
 * Loads the site analytics snippet (GA4 by default).
 */
export function Analytics() {
  const provider = getAnalyticsProvider();

  if (provider === "plausible") {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    if (!domain || domain.startsWith("{{")) return null;
    return (
      <Script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    );
  }

  if (provider === "ga4") {
    const id = getGa4Id();
    if (!id) return null;
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
        </Script>
      </>
    );
  }

  // Netlify Analytics is enabled in the Netlify UI — no snippet required.
  return null;
}
