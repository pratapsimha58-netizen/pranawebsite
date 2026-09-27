"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  coachingGoalOptions,
  goalLabels,
  type CoachingGoalId,
} from "@/lib/content";
import { waitlistSchema } from "@/lib/waitlist-schema";

type FieldErrors = Partial<Record<string, string>>;

type Outcome =
  | { kind: "idle" }
  | { kind: "created"; position: number }
  | { kind: "duplicate" }
  | { kind: "error"; message: string };

export function WaitlistForm({
  defaultGoal,
}: {
  defaultGoal?: CoachingGoalId;
} = {}) {
  const [primaryGoal, setPrimaryGoal] = useState<string>(defaultGoal ?? "");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" });
  const [pending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = waitlistSchema.safeParse({
      ...raw,
      primaryGoal,
      source: readSourceFromUrl(),
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    startTransition(async () => {
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        const body = (await res.json().catch(() => ({}))) as {
          status?: string;
          position?: number;
          error?: string;
        };
        if (res.status === 201 && body.status === "created") {
          setOutcome({ kind: "created", position: body.position ?? 0 });
          form.reset();
          setPrimaryGoal(defaultGoal ?? "");
        } else if (res.status === 200 && body.status === "duplicate") {
          setOutcome({ kind: "duplicate" });
        } else {
          setOutcome({
            kind: "error",
            message: body.error ?? "Something went wrong. Please try again.",
          });
        }
      } catch {
        setOutcome({
          kind: "error",
          message: "Could not reach the server. Check your connection and try again.",
        });
      }
    });
  }

  if (outcome.kind === "created") {
    return (
      <Alert className="border-[#3f5f4f]/30 bg-[#e7efe9]">
        <CheckCircle2 />
        <AlertTitle>
          You are on the list{outcome.position ? ` (#${outcome.position})` : ""}.
        </AlertTitle>
        <AlertDescription>
          Expect a short personal note within 48 hours with how to book a discovery call
          when a seat opens.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="email" error={errors.email} required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            className="bg-white/70"
          />
        </Field>
        <Field label="Name" htmlFor="name" error={errors.name} required>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            className="bg-white/70"
          />
        </Field>
        <Field
          label="Primary goal"
          htmlFor="primaryGoal"
          error={errors.primaryGoal}
          required
          className="sm:col-span-2"
        >
          <Select value={primaryGoal} onValueChange={setPrimaryGoal}>
            <SelectTrigger
              id="primaryGoal"
              className="w-full bg-white/70"
              aria-invalid={Boolean(errors.primaryGoal)}
            >
              <SelectValue placeholder="What is calling you most?" />
            </SelectTrigger>
            <SelectContent>
              {coachingGoalOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {goalLabels[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="City" htmlFor="city" error={errors.city} hint="Optional">
          <Input
            id="city"
            name="city"
            autoComplete="address-level2"
            placeholder="Bengaluru"
            className="bg-white/70"
          />
        </Field>
        <Field label="Phone / WhatsApp" htmlFor="phone" error={errors.phone} hint="Optional">
          <Input
            id="phone"
            name="phone"
            autoComplete="tel"
            placeholder="+91…"
            className="bg-white/70"
          />
        </Field>
      </div>

      {outcome.kind === "duplicate" ? (
        <Alert>
          <CheckCircle2 />
          <AlertTitle>This email is already on the waitlist.</AlertTitle>
          <AlertDescription>
            No need to sign up again. If you have not heard from us within 48 hours, reply
            to the confirmation note.
          </AlertDescription>
        </Alert>
      ) : null}

      {outcome.kind === "error" ? (
        <Alert variant="destructive">
          <AlertTitle>Could not save your details</AlertTitle>
          <AlertDescription>{outcome.message}</AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[var(--ink-soft)]">
          Soft follow-up only. Never sold. Never rushed.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="rounded-md bg-[#3f5f4f] text-[#f7f3ed] hover:bg-[#345043] sm:w-auto"
        >
          {pending ? <Loader2 className="animate-spin" data-icon="inline-start" /> : null}
          {pending ? "Saving" : "Join the waitlist"}
        </Button>
      </div>
    </form>
  );
}

function readSourceFromUrl(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const value = params.get("utm_source") ?? params.get("source") ?? params.get("ref");
  return value ? value.slice(0, 80) : undefined;
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-2 ${className ?? ""}`}>
      <div className="flex items-baseline justify-between">
        <Label htmlFor={htmlFor}>
          {label}
          {required ? <span className="text-destructive"> *</span> : null}
        </Label>
        {hint ? <span className="text-xs text-[var(--ink-soft)]">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
