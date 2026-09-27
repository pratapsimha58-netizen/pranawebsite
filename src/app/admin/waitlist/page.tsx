import Link from "next/link";
import { AlertTriangle, Database, Download } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getWaitlistStore } from "@/db/waitlist-store";
import type { WaitlistEntry } from "@/db/schema";
import { getAdminToken, isAdminAuthorised } from "@/lib/admin-auth";
import { site } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Waitlist admin | ${site.name}`,
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminWaitlistPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : undefined;

  if (!isAdminAuthorised(token)) {
    return (
      <Shell>
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Admin token required</AlertTitle>
          <AlertDescription>
            This page is protected because <code>ADMIN_TOKEN</code> is set. Open it as{" "}
            <code>/admin/waitlist?token=YOUR_TOKEN</code>.
          </AlertDescription>
        </Alert>
      </Shell>
    );
  }

  const store = getWaitlistStore();
  let rows: WaitlistEntry[] = [];
  let loadError: string | null = null;
  try {
    rows = await store.list();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
  }

  const exportHref = token
    ? `/admin/waitlist/export?token=${encodeURIComponent(token)}`
    : "/admin/waitlist/export";

  const bySource = rows.reduce<Record<string, number>>((acc, row) => {
    const key = row.source ?? "direct";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <Shell>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Admin</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Waitlist</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {rows.length} {rows.length === 1 ? "sign-up" : "sign-ups"}. Newest first.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={store.mode === "neon" ? "default" : "secondary"}>
            <Database data-icon="inline-start" />
            {store.mode === "neon" ? "Neon Postgres" : "In-memory store"}
          </Badge>
          <Button asChild variant="outline" size="sm" disabled={rows.length === 0}>
            <a href={exportHref}>
              <Download data-icon="inline-start" />
              Export CSV
            </a>
          </Button>
        </div>
      </div>

      {store.mode === "memory" ? (
        <Alert className="mt-6">
          <AlertTriangle />
          <AlertTitle>Not connected to Neon</AlertTitle>
          <AlertDescription>
            <code>DATABASE_URL</code> is not set, so sign-ups are held in memory and will be
            lost when the server restarts. Add your Neon connection string to{" "}
            <code>.env.local</code>, run <code>npm run db:migrate</code>, and restart.
          </AlertDescription>
        </Alert>
      ) : null}

      {!getAdminToken() ? (
        <p className="mt-4 text-xs text-muted-foreground">
          This page is open because <code>ADMIN_TOKEN</code> is not set. Set it before
          deploying.
        </p>
      ) : null}

      {loadError ? (
        <Alert variant="destructive" className="mt-6">
          <AlertTriangle />
          <AlertTitle>Could not load the waitlist</AlertTitle>
          <AlertDescription>
            {loadError}. Check that the <code>waitlist</code> table exists (run{" "}
            <code>npm run db:migrate</code>) and that <code>DATABASE_URL</code> is correct.
          </AlertDescription>
        </Alert>
      ) : null}

      {Object.keys(bySource).length > 1 ? (
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          {Object.entries(bySource)
            .sort((a, b) => b[1] - a[1])
            .map(([source, count]) => (
              <Badge key={source} variant="outline">
                {source}: {count}
              </Badge>
            ))}
        </div>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-xl border bg-card">
        {rows.length === 0 && !loadError ? (
          <div className="p-10 text-center">
            <p className="font-medium">No sign-ups yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Share the landing page. Entries will appear here as soon as someone joins.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/#waitlist">Open the waitlist form</Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Primary goal</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatDate(row.createdAt)}
                  </TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.primaryGoal}</TableCell>
                  <TableCell className="text-muted-foreground">{row.city ?? "-"}</TableCell>
                  <TableCell className="text-muted-foreground">{row.phone ?? "-"}</TableCell>
                  <TableCell className="text-muted-foreground">{row.source ?? "direct"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
        &larr; Back to {site.name}
      </Link>
      <div className="mt-6">{children}</div>
    </main>
  );
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}
