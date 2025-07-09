CREATE TYPE "public"."tipo_treino" AS ENUM('musculacao', 'cardio', 'ambos');--> statement-breakpoint
CREATE TABLE "treinos" (
	"id" uuid PRIMARY KEY NOT NULL,
	"usuario_id" uuid NOT NULL,
	"dia_semana" varchar(20) NOT NULL,
	"tipo" "tipo_treino" NOT NULL,
	"calorias" numeric(10, 2) NOT NULL,
	"peso" numeric(5, 2),
	"duracao" numeric(5, 2),
	"distancia" numeric(6, 2)
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "treinos" ADD CONSTRAINT "treinos_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;