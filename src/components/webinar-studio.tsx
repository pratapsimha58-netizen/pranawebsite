"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type WebinarRow = {
  id: number;
  slug: string;
  title: string;
  scheduledLabel: string | null;
  createdAt: string;
  published: boolean;
};

export function WebinarStudio({ token }: { token?: string }) {
  const [brief, setBrief] = useState("");
  const [title, setTitle] = useState("");
  const [scheduledLabel, setScheduledLabel] = useState("");
  const [hostName, setHostName] = useState("");
  const [rows, setRows] = useState<WebinarRow[]>([]);
  const [storage, setStorage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [createdPath, setCreatedPath] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const tokenQuery = token ? `?token=${encodeURIComponent(token)}` : "";
  const headers: HeadersInit = {
    "content-type": "application/json",
    ...(token ? { "x-admin-token": token } : {}),
  };

  function refresh() {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/webinars${tokenQuery}`, { headers });
        const body = (await res.json()) as {
          webinars?: WebinarRow[];
          storage?: string;
          error?: string;
        };
        if (!res.ok) {
          setError(body.error ?? "Could not load webinars");
          return;
        }
        setRows(body.webinars ?? []);
        setStorage(body.storage ?? "");
        setError(null);
      } catch {
        setError("Could not reach the webinar API.");
      }
    });
  }

  useEffect(() => {
    let cancelled = false;
    const loadHeaders: HeadersInit = {
      "content-type": "application/json",
      ...(token ? { "x-admin-token": token } : {}),
    };
    const query = token ? `?token=${encodeURIComponent(token)}` : "";
    (async () => {
      try {
        const res = await fetch(`/api/admin/webinars${query}`, { headers: loadHeaders });
        const body = (await res.json()) as {
          webinars?: WebinarRow[];
          storage?: string;
          error?: string;
        };
        if (cancelled) return;
        if (!res.ok) {
          setError(body.error ?? "Could not load webinars");
          return;
        }
        setRows(body.webinars ?? []);
        setStorage(body.storage ?? "");
      } catch {
        if (!cancelled) setError("Could not reach the webinar API.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  function onCreate(event: React.FormEvent) {
    event.preventDefault();
    setCreatedPath(null);
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/webinars${tokenQuery}`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            brief,
            title: title || undefined,
            scheduledLabel: scheduledLabel || undefined,
            hostName: hostName || undefined,
          }),
        });
        const body = (await res.json()) as {
          path?: string;
          error?: string;
          webinar?: WebinarRow;
        };
        if (!res.ok) {
          setError(body.error ?? "Create failed");
          return;
        }
        setCreatedPath(body.path ?? null);
        setBrief("");
        setTitle("");
        setScheduledLabel("");
        setHostName("");
        refresh();
      } catch {
        setError("Could not create the webinar page.");
      }
    });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onCreate} className="grid gap-5 rounded-2xl border border-[#d7d0c4] bg-[#faf7f2]/90 p-6 sm:p-8">
        <div>
          <p className="text-xs tracking-[0.16em] text-[var(--ink-soft)] uppercase">
            Create from a brief
          </p>
          <h2 className="mt-2 font-display text-3xl text-[#24302a]">Describe the webinar</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            Write what you want in plain language. The panel shapes a Prana Way page and
            publishes it under <code className="text-xs">/webinars/…</code>. Generation runs
            on this site — not a live Cursor Cloud backend.
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="brief">Brief</Label>
          <textarea
            id="brief"
            required
            rows={7}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder={`Example:\nWebinar: Returning to evening walks without forcing a gym plan\nDate: 12 October at 7pm IST\nHost: Pratap\nHelp busy parents rebuild fitness and quiet confidence in 60 minutes.`}
            className="min-h-40 w-full rounded-md border border-[#d7d0c4] bg-white/70 px-3 py-2 text-sm leading-relaxed text-[#24302a] outline-none focus-visible:border-[#3f5f4f] focus-visible:ring-2 focus-visible:ring-[#3f5f4f]/25"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Title override (optional)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Leave blank to auto-title"
              className="bg-white/70"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="when">When (optional)</Label>
            <Input
              id="when"
              value={scheduledLabel}
              onChange={(e) => setScheduledLabel(e.target.value)}
              placeholder="12 Oct · 7pm IST"
              className="bg-white/70"
            />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="host">Host (optional)</Label>
            <Input
              id="host"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="Prana Way"
              className="bg-white/70"
            />
          </div>
        </div>

        {error ? (
          <Alert variant="destructive">
            <AlertTitle>Could not create page</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        {createdPath ? (
          <Alert className="border-[#3f5f4f]/30 bg-[#e7efe9]">
            <CheckCircle2 />
            <AlertTitle>Page is live</AlertTitle>
            <AlertDescription>
              Open{" "}
              <Link href={createdPath} className="underline underline-offset-2">
                {createdPath}
              </Link>
            </AlertDescription>
          </Alert>
        ) : null}

        <Button
          type="submit"
          disabled={pending || brief.trim().length < 12}
          className="h-11 rounded-md bg-[#3f5f4f] text-[#f7f3ed] hover:bg-[#345043]"
        >
          {pending ? (
            <Loader2 className="animate-spin" data-icon="inline-start" />
          ) : (
            <Sparkles data-icon="inline-start" />
          )}
          {pending ? "Creating…" : "Generate webinar page"}
        </Button>
      </form>

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl text-[#24302a]">Published pages</h2>
          <p className="text-xs text-[var(--ink-soft)]">
            {storage ? `Storage: ${storage}` : null}
          </p>
        </div>
        {rows.length === 0 ? (
          <p className="mt-6 text-sm text-[var(--ink-soft)]">
            No webinars yet. Your first brief will appear here.
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {rows.map((row) => (
              <li
                key={row.id}
                className="rounded-xl border border-[#d7d0c4] bg-[#faf7f2]/80 px-4 py-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link
                    href={`/webinars/${row.slug}`}
                    className="font-medium text-[#24302a] underline-offset-2 hover:underline"
                  >
                    {row.title}
                  </Link>
                  <span className="text-xs text-[var(--ink-soft)]">
                    /webinars/{row.slug}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--ink-soft)]">
                  {row.scheduledLabel ?? "Date TBA"}
                  {row.published ? "" : " · draft"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
