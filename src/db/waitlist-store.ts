import { desc, eq } from "drizzle-orm";
import { getDb } from "./client";
import { waitlist, type NewWaitlistEntry, type WaitlistEntry } from "./schema";

export type StorageMode = "neon" | "memory";

export type WaitlistInput = Omit<NewWaitlistEntry, "id" | "createdAt">;

export type AddResult =
  | { status: "created"; entry: WaitlistEntry }
  | { status: "duplicate"; entry: WaitlistEntry };

export interface WaitlistStore {
  readonly mode: StorageMode;
  add(input: WaitlistInput): Promise<AddResult>;
  list(): Promise<WaitlistEntry[]>;
  count(): Promise<number>;
}

const normaliseEmail = (email: string) => email.trim().toLowerCase();

class NeonWaitlistStore implements WaitlistStore {
  readonly mode = "neon" as const;

  constructor(private readonly db: NonNullable<ReturnType<typeof getDb>>) {}

  async add(input: WaitlistInput): Promise<AddResult> {
    const email = normaliseEmail(input.email);
    const existing = await this.db.query.waitlist.findFirst({
      where: eq(waitlist.email, email),
    });
    if (existing) return { status: "duplicate", entry: existing };

    const [entry] = await this.db
      .insert(waitlist)
      .values({ ...input, email })
      .onConflictDoNothing({ target: waitlist.email })
      .returning();

    if (!entry) {
      const raced = await this.db.query.waitlist.findFirst({
        where: eq(waitlist.email, email),
      });
      if (raced) return { status: "duplicate", entry: raced };
      throw new Error("Insert returned no row");
    }
    return { status: "created", entry };
  }

  list() {
    return this.db.select().from(waitlist).orderBy(desc(waitlist.createdAt));
  }

  async count() {
    return (await this.list()).length;
  }
}

class MemoryWaitlistStore implements WaitlistStore {
  readonly mode = "memory" as const;
  private readonly rows: WaitlistEntry[];
  private nextId: number;

  constructor(seed: WaitlistEntry[]) {
    this.rows = seed;
    this.nextId = seed.reduce((max, r) => Math.max(max, r.id), 0) + 1;
  }

  async add(input: WaitlistInput): Promise<AddResult> {
    const email = normaliseEmail(input.email);
    const existing = this.rows.find((r) => r.email === email);
    if (existing) return { status: "duplicate", entry: existing };
    const entry: WaitlistEntry = {
      id: this.nextId++,
      email,
      name: input.name,
      primaryGoal: input.primaryGoal,
      city: input.city ?? null,
      phone: input.phone ?? null,
      source: input.source ?? null,
      createdAt: new Date(),
    };
    this.rows.push(entry);
    return { status: "created", entry };
  }

  async list() {
    return [...this.rows].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  async count() {
    return this.rows.length;
  }
}

const globalForStore = globalThis as unknown as {
  __pranaMemoryRows?: WaitlistEntry[];
};

export function getWaitlistStore(): WaitlistStore {
  const db = getDb();
  if (db) return new NeonWaitlistStore(db);
  if (!globalForStore.__pranaMemoryRows) {
    globalForStore.__pranaMemoryRows = [];
  }
  return new MemoryWaitlistStore(globalForStore.__pranaMemoryRows);
}
