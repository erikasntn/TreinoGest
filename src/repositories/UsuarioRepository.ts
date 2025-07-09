import { Usuario } from "../domain/entities/Usuario.js";

export interface UsuarioRepository {
  buscarPorId(id: string): Promise<Usuario | null>;
}