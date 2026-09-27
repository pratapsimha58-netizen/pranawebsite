import { GoalRoute, goalMetadata } from "@/lib/goal-route";

const slug = "fitness-habits-coaching";

export const metadata = goalMetadata(slug);

export default function Page() {
  return <GoalRoute slug={slug} />;
}
