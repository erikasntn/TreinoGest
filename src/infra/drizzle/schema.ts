// src/infra/drizzle/schema.ts
import { pgTable, varchar, uuid, numeric, pgEnum, unique } from 'drizzle-orm/pg-core';

export const tipoTreinoEnum = pgEnum('tipo_treino', ['musculacao', 'cardio', 'ambos']);

export const usuarios = pgTable('usuarios', {
  id: uuid('id').primaryKey(),
  nome: varchar('nome', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  senha: varchar('senha', { length: 255 }).notNull(), // Tamanho suficiente para hash bcrypt
}, (table) => ({
  emailIdx: unique('email_idx').on(table.email),
}));

export const treinos = pgTable('treinos', {
  id: uuid('id').primaryKey(),
  usuarioId: uuid('usuario_id').notNull().references(() => usuarios.id),
  diaSemana: varchar('dia_semana', { length: 20 }).notNull(),
  tipo: tipoTreinoEnum('tipo').notNull(),
  calorias: numeric('calorias', { precision: 10, scale: 2 }).notNull(),
  peso: numeric('peso', { precision: 5, scale: 2 }),
  duracao: numeric('duracao', { precision: 5, scale: 2 }),
  distancia: numeric('distancia', { precision: 6, scale: 2 }),
});