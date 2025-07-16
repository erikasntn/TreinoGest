ALTER TABLE "usuarios" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "usuarios" ADD COLUMN "senha" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "usuarios" ADD CONSTRAINT "email_idx" UNIQUE("email");