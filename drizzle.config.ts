import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next.js reads .env.local on its own; drizzle-kit does not, so load both here.
config({ path: [".env.local", ".env"] });

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env.local (or .env) and add your Neon connection string.",
  );
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
