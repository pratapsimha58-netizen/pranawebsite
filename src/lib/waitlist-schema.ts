import { z } from "zod";
import { coachingGoalOptions } from "@/lib/content";

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const waitlistSchema = z.object({
  email: z
    .string({ message: "Enter your email address" })
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(320),
  name: z.string({ message: "Enter your name" }).trim().min(2, "Enter your name").max(120),
  primaryGoal: z.enum(coachingGoalOptions, {
    message: "Choose the goal that calls you most",
  }),
  city: optionalTrimmed(80),
  phone: optionalTrimmed(20),
  source: optionalTrimmed(80),
});

export type WaitlistFormValues = z.input<typeof waitlistSchema>;
export type WaitlistPayload = z.output<typeof waitlistSchema>;
