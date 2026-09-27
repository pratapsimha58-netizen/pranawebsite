-- Rebuild waitlist for Prana Way coaching goals.
DROP TABLE IF EXISTS "waitlist";
--> statement-breakpoint
CREATE TABLE "waitlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" varchar(120) NOT NULL,
	"primary_goal" varchar(32) NOT NULL,
	"city" varchar(80),
	"phone" varchar(20),
	"source" varchar(80),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
