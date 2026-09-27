import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  currentRole: varchar("current_role", { length: 120 }).notNull(),
  yearsExperience: varchar("years_experience", { length: 16 }).notNull(),
  targetRole: varchar("target_role", { length: 120 }),
  city: varchar("city", { length: 80 }),
  phone: varchar("phone", { length: 20 }),
  source: varchar("source", { length: 80 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type WaitlistEntry = typeof waitlist.$inferSelect;
export type NewWaitlistEntry = typeof waitlist.$inferInsert;

export const yearsExperienceOptions = ["0-2", "2-4", "4-8", "8+"] as const;
export type YearsExperience = (typeof yearsExperienceOptions)[number];
