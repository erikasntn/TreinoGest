import { Usuario } from "../domain/entities/Usuario.js";

export interface UsuarioRepository {
  salvar(usuario: Usuario): Promise<void>;
  buscarPorEmail(email: string): Promise<Usuario | null>
  buscarPorId(id: string): Promise<Usuario | null>;
}