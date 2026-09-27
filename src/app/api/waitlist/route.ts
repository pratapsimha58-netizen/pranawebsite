import { NextResponse } from "next/server";
import { getWaitlistStore } from "@/db/waitlist-store";
import { waitlistSchema } from "@/lib/waitlist-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be JSON" }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  try {
    const store = getWaitlistStore();
    const result = await store.add(parsed.data);
    if (result.status === "duplicate") {
      return NextResponse.json({ status: "duplicate" }, { status: 200 });
    }
    const position = await store.count();
    return NextResponse.json(
      { status: "created", position, storage: store.mode },
      { status: 201 },
    );
  } catch (error) {
    console.error("[waitlist] failed to save entry", error);
    return NextResponse.json(
      { error: "We could not save your details right now. Please try again in a minute." },
      { status: 500 },
    );
  }
}
