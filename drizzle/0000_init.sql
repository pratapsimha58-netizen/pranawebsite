CREATE TABLE "waitlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"name" varchar(120) NOT NULL,
	"current_role" varchar(120) NOT NULL,
	"years_experience" varchar(16) NOT NULL,
	"target_role" varchar(120),
	"city" varchar(80),
	"phone" varchar(20),
	"source" varchar(80),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
