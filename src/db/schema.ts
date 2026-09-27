import {
  boolean,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { coachingGoalOptions, type CoachingGoalId } from "@/lib/content";

export { coachingGoalOptions };
export type CoachingGoalOption = CoachingGoalId;

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

export const webinars = pgTable("webinars", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  subtitle: varchar("subtitle", { length: 280 }),
  summary: text("summary").notNull(),
  scheduledLabel: varchar("scheduled_label", { length: 120 }),
  duration: varchar("duration", { length: 40 }),
  hostName: varchar("host_name", { length: 120 }).notNull(),
  agenda: jsonb("agenda").$type<string[]>().notNull(),
  takeaways: jsonb("takeaways").$type<string[]>().notNull(),
  goals: jsonb("goals").$type<string[]>().notNull(),
  ctaLabel: varchar("cta_label", { length: 80 }).notNull(),
  heroCaption: varchar("hero_caption", { length: 160 }),
  brief: text("brief").notNull(),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Webinar = typeof webinars.$inferSelect;
export type NewWebinar = typeof webinars.$inferInsert;
