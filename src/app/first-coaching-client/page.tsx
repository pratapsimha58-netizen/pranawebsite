import { GoalRoute, goalMetadata } from "@/lib/goal-route";

const slug = "first-coaching-client";

export const metadata = goalMetadata(slug);

export default function Page() {
  return <GoalRoute slug={slug} />;
}
