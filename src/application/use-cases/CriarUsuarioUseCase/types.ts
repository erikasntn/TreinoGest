import { z } from 'zod';

export const CriarUsuarioRequestSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido').max(255, 'Email muito longo'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').max(255, 'Senha muito longa'),
});

export type CriarUsuarioRequest = z.infer<typeof CriarUsuarioRequestSchema>;

