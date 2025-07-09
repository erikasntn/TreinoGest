import { Treino } from "../domain/entities/Treino.js";

export interface TreinoRepository {
    salvar(treino: Treino): Promise<void>
    buscarPorUsuarioEDia(usuarioId: string, diaSemana: string): Promise<Treino | null>
}