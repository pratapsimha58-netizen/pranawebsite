import { GoalRoute, goalMetadata } from "@/lib/goal-route";

const slug = "resilience-coaching";

export const metadata = goalMetadata(slug);

export default function Page() {
  return <GoalRoute slug={slug} />;
}
