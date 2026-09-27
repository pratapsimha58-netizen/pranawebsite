import { packages } from "@/lib/content";
import { site } from "@/lib/site";

function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

function sameAs(): string[] {
  return Object.values(site.social).filter((v) => v && !v.startsWith("{{"));
}

export function buildOrganizationGraph() {
  const orgId = `${site.url}/#organization`;
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: site.name,
        url: site.url,
        description: site.description,
        areaServed: [
          { "@type": "City", name: site.city },
          { "@type": "Country", name: "India" },
          "Online",
        ],
        sameAs: sameAs(),
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.person.name,
        alternateName: site.person.fullName.startsWith("{{")
          ? undefined
          : site.person.fullName,
        jobTitle: site.person.jobTitle,
        image: absoluteUrl(site.person.image),
        worksFor: { "@id": orgId },
        knowsAbout: [
          "habit change",
          "resilience",
          "fitness habits",
          "confidence",
          "coaching business",
          "career transitions",
          "people development",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "ICF Credential (100+ coaching hours)",
            credentialCategory: "Professional certification",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "NLP Practitioner",
            credentialCategory: "Professional certification",
          },
        ],
        sameAs: sameAs(),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        url: site.url,
        description: site.description,
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function buildServiceOffers() {
  return packages.map((pkg) => ({
    "@type": "Service",
    name: pkg.name,
    description: pkg.summary,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [site.city, "Online", "India"],
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/#packages`,
    },
  }));
}

export function buildFaqPage(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a.replace(/\{\{TODO:[^}]+\}\}/g, "").trim(),
      },
    })),
  };
}

export function buildBreadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: absoluteUrl(input.path),
  };
}
