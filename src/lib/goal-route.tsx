import type { Metadata } from "next";
import { GoalPageView } from "@/components/goal-page";
import { getGoalPage } from "@/lib/goals";
import { site } from "@/lib/site";

export function goalMetadata(slug: string): Metadata {
  const goal = getGoalPage(slug);
  if (!goal) return {};
  return {
    title: goal.metaTitle,
    description: goal.metaDescription,
    alternates: { canonical: `/${goal.slug}` },
    openGraph: {
      title: `${goal.metaTitle} | ${site.name}`,
      description: goal.metaDescription,
      url: `${site.url}/${goal.slug}`,
    },
  };
}

export function GoalRoute({ slug }: { slug: string }) {
  const goal = getGoalPage(slug);
  if (!goal) {
    throw new Error(`Missing goal page content for ${slug}`);
  }
  return <GoalPageView goal={goal} />;
}
