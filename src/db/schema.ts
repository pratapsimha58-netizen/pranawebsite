import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const coachingGoalOptions = [
  "fitness",
  "habits",
  "resilience",
  "confidence",
  "clarity",
] as const;

export type CoachingGoalOption = (typeof coachingGoalOptions)[number];

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  primaryGoal: varchar("primary_goal", { length: 32 }).notNull(),
  city: varchar("city", { length: 80 }),
  phone: varchar("phone", { length: 20 }),
  source: varchar("source", { length: 80 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type WaitlistEntry = typeof waitlist.$inferSelect;
export type NewWaitlistEntry = typeof waitlist.$inferInsert;
