import { desc, eq } from "drizzle-orm";
import { getDb } from "./client";
import { webinars, type NewWebinar, type Webinar } from "./schema";

export type StorageMode = "neon" | "memory";

export type WebinarInput = Omit<NewWebinar, "id" | "createdAt">;

export interface WebinarStore {
  readonly mode: StorageMode;
  create(input: WebinarInput): Promise<Webinar>;
  list(): Promise<Webinar[]>;
  getBySlug(slug: string): Promise<Webinar | null>;
  slugs(): Promise<string[]>;
}

class NeonWebinarStore implements WebinarStore {
  readonly mode = "neon" as const;

  constructor(private readonly db: NonNullable<ReturnType<typeof getDb>>) {}

  async create(input: WebinarInput): Promise<Webinar> {
    const [row] = await this.db.insert(webinars).values(input).returning();
    if (!row) throw new Error("Webinar insert returned no row");
    return row;
  }

  list() {
    return this.db.select().from(webinars).orderBy(desc(webinars.createdAt));
  }

  async getBySlug(slug: string) {
    const [row] = await this.db
      .select()
      .from(webinars)
      .where(eq(webinars.slug, slug))
      .limit(1);
    return row ?? null;
  }

  async slugs() {
    const rows = await this.db.select({ slug: webinars.slug }).from(webinars);
    return rows.map((r) => r.slug);
  }
}

class MemoryWebinarStore implements WebinarStore {
  readonly mode = "memory" as const;
  private readonly rows: Webinar[];
  private nextId: number;

  constructor(seed: Webinar[]) {
    this.rows = seed;
    this.nextId = seed.reduce((max, r) => Math.max(max, r.id), 0) + 1;
  }

  async create(input: WebinarInput): Promise<Webinar> {
    if (this.rows.some((r) => r.slug === input.slug)) {
      throw new Error(`Slug already exists: ${input.slug}`);
    }
    const row: Webinar = {
      id: this.nextId++,
      slug: input.slug,
      title: input.title,
      subtitle: input.subtitle ?? null,
      summary: input.summary,
      scheduledLabel: input.scheduledLabel ?? null,
      duration: input.duration ?? null,
      hostName: input.hostName,
      agenda: input.agenda,
      takeaways: input.takeaways,
      goals: input.goals,
      ctaLabel: input.ctaLabel,
      heroCaption: input.heroCaption ?? null,
      brief: input.brief,
      published: input.published ?? true,
      createdAt: new Date(),
    };
    this.rows.unshift(row);
    return row;
  }

  async list() {
    return [...this.rows].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  async getBySlug(slug: string) {
    return this.rows.find((r) => r.slug === slug) ?? null;
  }

  async slugs() {
    return this.rows.map((r) => r.slug);
  }
}

const globalForStore = globalThis as unknown as {
  __pranaWebinarRows?: Webinar[];
};

export function getWebinarStore(): WebinarStore {
  const db = getDb();
  if (db) return new NeonWebinarStore(db);
  if (!globalForStore.__pranaWebinarRows) {
    globalForStore.__pranaWebinarRows = [];
  }
  return new MemoryWebinarStore(globalForStore.__pranaWebinarRows);
}
