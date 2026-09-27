import { getWaitlistStore } from "@/db/waitlist-store";
import { isAdminAuthorised } from "@/lib/admin-auth";
import { waitlistToCsv } from "@/lib/csv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? request.headers.get("x-admin-token");
  if (!isAdminAuthorised(token)) {
    return new Response("Unauthorised", { status: 401 });
  }

  const store = getWaitlistStore();
  const rows = await store.list();
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(waitlistToCsv(rows), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="waitlist-${stamp}.csv"`,
      "cache-control": "no-store",
    },
  });
}
