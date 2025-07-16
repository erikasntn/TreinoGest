
import { z } from 'zod';

export const LoginUsuarioRequestSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginUsuarioRequest = z.infer<typeof LoginUsuarioRequestSchema>;