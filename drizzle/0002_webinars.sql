-- Webinar landing pages created from the admin panel.
CREATE TABLE IF NOT EXISTS "webinars" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(120) NOT NULL,
	"title" varchar(200) NOT NULL,
	"subtitle" varchar(280),
	"summary" text NOT NULL,
	"scheduled_label" varchar(120),
	"duration" varchar(40),
	"host_name" varchar(120) NOT NULL,
	"agenda" jsonb NOT NULL,
	"takeaways" jsonb NOT NULL,
	"goals" jsonb NOT NULL,
	"cta_label" varchar(80) NOT NULL,
	"hero_caption" varchar(160),
	"brief" text NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "webinars_slug_unique" UNIQUE("slug")
);
