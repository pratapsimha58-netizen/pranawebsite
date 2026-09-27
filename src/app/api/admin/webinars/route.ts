import { NextResponse } from "next/server";
import { z } from "zod";
import { getWebinarStore } from "@/db/webinar-store";
import { isAdminAuthorised } from "@/lib/admin-auth";
import { generateWebinarFromBrief, withUniqueSlug } from "@/lib/webinar-generate";

export const runtime = "nodejs";

function tokenFrom(request: Request): string | undefined {
  const header = request.headers.get("x-admin-token");
  if (header) return header;
  const url = new URL(request.url);
  const q = url.searchParams.get("token");
  return q ?? undefined;
}

export async function GET(request: Request) {
  if (!isAdminAuthorised(tokenFrom(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const store = getWebinarStore();
  const rows = await store.list();
  return NextResponse.json({ storage: store.mode, webinars: rows });
}

const createSchema = z.object({
  brief: z.string().trim().min(12, "Add a short brief for the webinar").max(4000),
  title: z.string().trim().min(2).max(200).optional(),
  slug: z
    .string()
    .trim()
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase slug like my-webinar")
    .optional(),
  scheduledLabel: z.string().trim().max(120).optional(),
  hostName: z.string().trim().max(120).optional(),
  publish: z.boolean().optional(),
});

export async function POST(request: Request) {
  if (!isAdminAuthorised(tokenFrom(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be JSON" }, { status: 400 });
  }

  const parsed = createSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  try {
    const draft = generateWebinarFromBrief(parsed.data.brief);
    if (parsed.data.title) draft.title = parsed.data.title;
    if (parsed.data.scheduledLabel) draft.scheduledLabel = parsed.data.scheduledLabel;
    if (parsed.data.hostName) draft.hostName = parsed.data.hostName;
    if (parsed.data.publish === false) draft.published = false;

    const store = getWebinarStore();
    const existing = await store.slugs();
    draft.slug = withUniqueSlug(parsed.data.slug ?? draft.slug, existing);

    const webinar = await store.create(draft);
    return NextResponse.json(
      {
        status: "created",
        storage: store.mode,
        webinar,
        path: `/webinars/${webinar.slug}`,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[webinars] create failed", error);
    const message =
      error instanceof Error ? error.message : "Could not create the webinar page.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
