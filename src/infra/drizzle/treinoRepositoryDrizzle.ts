import { TreinoRepository } from "../../repositories/TreinoRepository.js";
import { Treino } from "../../domain/entities/Treino.js";
import { db } from "./db.js";
import { treinos } from "./schema.js";
import { eq, and } from "drizzle-orm";

export class TreinoRepositoryDrizzle implements TreinoRepository {
  async salvar(treino: Treino): Promise<void> {
    await db.insert(treinos).values({
      id: treino.id,
      usuarioId: treino.usuarioId,
      diaSemana: treino.diaSemana,
      tipo: treino.tipo,
      calorias: treino.calorias.toString(),
      peso: treino.peso?.toString(),
      duracao: treino.duracao?.toString(),
      distancia: treino.distancia?.toString(),
    });
  }

  async buscarPorUsuarioEDia(
    usuarioId: string,
    diaSemana: string
  ): Promise<Treino | null> {
    const resultado = await db
      .select()
      .from(treinos)
      .where(
        and(eq(treinos.usuarioId, usuarioId), eq(treinos.diaSemana, diaSemana))
      );
    const treinoDb = resultado[0];
    if (!treinoDb) return null;

    return new Treino({
      id: treinoDb.id,
      usuarioId: treinoDb.usuarioId,
      diaSemana: treinoDb.diaSemana,
      tipo: treinoDb.tipo as Treino["tipo"],
      calorias: Number(treinoDb.calorias),
      peso: treinoDb.peso ? Number(treinoDb.peso) : undefined,
      duracao: treinoDb.duracao ? Number(treinoDb.duracao) : undefined,
      distancia: treinoDb.distancia ? Number(treinoDb.distancia) : undefined,
    });
  }
}
