import { Treino } from "../../../domain/entities/Treino.js";
import { TreinoRepository } from "../../../repositories/TreinoRepository.js";
import { UsuarioRepository } from "../../../repositories/UsuarioRepository.js";
import { randomUUID } from "crypto";
import { CriarTreinoRequest, CriarTreinoRequestSchema } from "./types.js";

export class CriarTreinoUseCase {
  constructor(
    private treinoRepository: TreinoRepository,
    private usuarioRepository: UsuarioRepository
  ) {}

  async executar(data: CriarTreinoRequest): Promise<Treino> {
    CriarTreinoRequestSchema.parse(data);

    const usuarioExistente = await this.usuarioRepository.buscarPorId(
      data.usuarioId
    );
   if (!usuarioExistente) {
      throw new Error("Usuário não encontrado.");
    }
    const treinoExistente = await this.treinoRepository.buscarPorUsuarioEDia(
      data.usuarioId,
      data.diaSemana
    );

    if (treinoExistente) {
      throw new Error("Ja existe um treino para esse usuário  nesse dia. ");
    }
    const treino = new Treino({
      id: randomUUID(),
      usuarioId: data.usuarioId,
      diaSemana: data.diaSemana,
      tipo: data.tipo,
      calorias: data.calorias,
      peso: data.peso,
      duracao: data.duracao,
      distancia: data.distancia,
    });
    await this.treinoRepository.salvar(treino);
    return treino;
  }
}
export { CriarTreinoRequest };

