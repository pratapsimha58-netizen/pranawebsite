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
import { yearsExperienceOptions } from "@/db/schema";
import { waitlistSchema } from "@/lib/waitlist-schema";

type FieldErrors = Partial<Record<string, string>>;

type Outcome =
  | { kind: "idle" }
  | { kind: "created"; position: number }
  | { kind: "duplicate" }
  | { kind: "error"; message: string };

const experienceLabels: Record<(typeof yearsExperienceOptions)[number], string> = {
  "0-2": "0-2 years",
  "2-4": "2-4 years",
  "4-8": "4-8 years",
  "8+": "8+ years",
};

export function WaitlistForm() {
  const [yearsExperience, setYearsExperience] = useState<string>("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" });
  const [pending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = waitlistSchema.safeParse({
      ...raw,
      yearsExperience,
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
          setYearsExperience("");
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
      <Alert className="border-primary/40">
        <CheckCircle2 />
        <AlertTitle>You are on the list{outcome.position ? ` (#${outcome.position})` : ""}.</AlertTitle>
        <AlertDescription>
          We will message you on email within 24 hours with how to send your resume for
          the free ATS score. Founding-customer pricing goes to the first 10 paid orders.
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
          />
        </Field>
        <Field label="Name" htmlFor="name" error={errors.name} required>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Priya Sharma"
            aria-invalid={Boolean(errors.name)}
          />
        </Field>
        <Field label="Current role" htmlFor="currentRole" error={errors.currentRole} required>
          <Input
            id="currentRole"
            name="currentRole"
            placeholder="Software Engineer at an IT services firm"
            aria-invalid={Boolean(errors.currentRole)}
          />
        </Field>
        <Field
          label="Years of experience"
          htmlFor="yearsExperience"
          error={errors.yearsExperience}
          required
        >
          <Select value={yearsExperience} onValueChange={setYearsExperience}>
            <SelectTrigger
              id="yearsExperience"
              className="w-full"
              aria-invalid={Boolean(errors.yearsExperience)}
            >
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              {yearsExperienceOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {experienceLabels[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Target role" htmlFor="targetRole" error={errors.targetRole} hint="Optional">
          <Input
            id="targetRole"
            name="targetRole"
            placeholder="Backend Engineer at a product company"
          />
        </Field>
        <Field label="City" htmlFor="city" error={errors.city} hint="Optional">
          <Input id="city" name="city" autoComplete="address-level2" placeholder="Bengaluru" />
        </Field>
      </div>

      {outcome.kind === "duplicate" ? (
        <Alert>
          <CheckCircle2 />
          <AlertTitle>This email is already on the waitlist.</AlertTitle>
          <AlertDescription>
            No need to sign up again. If you have not heard from us within 24 hours,
            reply to the confirmation email.
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
        <p className="text-xs text-muted-foreground">
          No spam. One email to collect your resume, then WhatsApp if you prefer.
        </p>
        <Button type="submit" size="lg" disabled={pending} className="sm:w-auto">
          {pending ? <Loader2 className="animate-spin" data-icon="inline-start" /> : null}
          {pending ? "Saving" : "Join the waitlist"}
        </Button>
      </div>
    </form>
  );
}

/** Channel attribution for the GTM plan: ?utm_source=, ?source= or ?ref= on the landing URL. */
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
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={htmlFor}>
          {label}
          {required ? <span className="text-destructive"> *</span> : null}
        </Label>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
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
