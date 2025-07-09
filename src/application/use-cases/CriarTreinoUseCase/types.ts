// src/useCases/treino/types.ts
import { z } from 'zod';

export const CriarTreinoRequestSchema = z.object({
  usuarioId: z.string().uuid('ID de usuário inválido'),
  diaSemana: z.enum(['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'], {
    errorMap: () => ({ message: 'Dia da semana inválido' }),
  }),
  tipo: z.enum(['musculacao', 'cardio', 'ambos'], {
    errorMap: () => ({ message: 'Tipo de treino inválido' }),
  }),
  calorias: z.number().positive('Calorias devem ser positivas'),
  peso: z.number().positive('Peso deve ser positivo').optional(),
  duracao: z.number().positive('Duração deve ser positiva').optional(),
  distancia: z.number().positive('Distância deve ser positiva').optional(),
});

export type CriarTreinoRequest = z.infer<typeof CriarTreinoRequestSchema>;