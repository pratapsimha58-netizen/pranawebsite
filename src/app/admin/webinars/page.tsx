import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WebinarStudio } from "@/components/webinar-studio";
import { getAdminToken, isAdminAuthorised } from "@/lib/admin-auth";
import { site } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Webinar studio | ${site.name}`,
  robots: { index: false, follow: false },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminWebinarsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : undefined;

  if (!isAdminAuthorised(token)) {
    return (
      <Shell token={token}>
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Admin token required</AlertTitle>
          <AlertDescription>
            Open this page as <code>/admin/webinars?token=YOUR_TOKEN</code>.
          </AlertDescription>
        </Alert>
      </Shell>
    );
  }

  return (
    <Shell token={token}>
      <div className="mb-8">
        <p className="text-sm font-medium text-[#3f5f4f]">Admin</p>
        <h1 className="mt-1 font-display text-4xl text-[#24302a]">Webinar studio</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Tell the panel what the session is about. It drafts a page in the same warm Prana
          Way format and publishes it on your domain instantly.
        </p>
        {!getAdminToken() ? (
          <p className="mt-3 text-xs text-[var(--ink-soft)]">
            <code>ADMIN_TOKEN</code> is unset, so this studio is open locally. Set it before
            production.
          </p>
        ) : null}
      </div>
      <WebinarStudio token={token} />
    </Shell>
  );
}

function Shell({
  children,
  token,
}: {
  children: React.ReactNode;
  token?: string;
}) {
  const q = token ? `?token=${encodeURIComponent(token)}` : "";
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--ink-soft)]">
        <Link href="/" className="hover:text-[#24302a]">
          &larr; {site.name}
        </Link>
        <Link href={`/admin/waitlist${q}`} className="hover:text-[#24302a]">
          Waitlist
        </Link>
        <span className="text-[#24302a]">Webinars</span>
      </div>
      <div className="mt-6">{children}</div>
    </main>
  );
}
