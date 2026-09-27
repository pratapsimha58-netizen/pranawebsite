import type { WaitlistEntry } from "@/db/schema";
import { goalLabels, type CoachingGoalId } from "@/lib/content";

const columns: { header: string; pick: (row: WaitlistEntry) => string }[] = [
  { header: "id", pick: (r) => String(r.id) },
  { header: "created_at", pick: (r) => r.createdAt.toISOString() },
  { header: "email", pick: (r) => r.email },
  { header: "name", pick: (r) => r.name },
  {
    header: "primary_goal",
    pick: (r) => goalLabels[r.primaryGoal as CoachingGoalId] ?? r.primaryGoal,
  },
  { header: "city", pick: (r) => r.city ?? "" },
  { header: "phone", pick: (r) => r.phone ?? "" },
  { header: "source", pick: (r) => r.source ?? "" },
];

function escapeCell(value: string): string {
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return /[",\r\n]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export function waitlistToCsv(rows: WaitlistEntry[]): string {
  const lines = [columns.map((c) => c.header).join(",")];
  for (const row of rows) {
    lines.push(columns.map((c) => escapeCell(c.pick(row))).join(","));
  }
  return lines.join("\r\n") + "\r\n";
}
