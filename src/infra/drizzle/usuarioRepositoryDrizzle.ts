import { UsuarioRepository } from "../../repositories/UsuarioRepository.js";
import { Usuario } from "../../domain/entities/Usuario.js";
import { db } from "./db.js";
import { usuarios } from "./schema.js";
import { eq } from "drizzle-orm";

export class UsuarioRepositoryDrizzle implements UsuarioRepository {
  async buscarPorId(id: string): Promise<Usuario | null> {
    const resultado = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.id, id));
    const usuarioDb = resultado[0];

    if (!usuarioDb) return null;

    return new Usuario({
      id: usuarioDb.id,
      nome: usuarioDb.nome,
    });
  }
}
