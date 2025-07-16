import { CriarUsuarioRequest } from "./types.js";
import { UsuarioRepository } from "../../../repositories/UsuarioRepository.js";
import { Usuario } from "../../../domain/entities/Usuario.js";
import { CriarTreinoRequestSchema } from "../CriarTreinoUseCase/types.js";
import bcrypt from "bcrypt";
import { randomUUID } from 'crypto';

export class CriarUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async executar(data: CriarUsuarioRequest): Promise<Usuario> {
    CriarTreinoRequestSchema.parse(data);

    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(
      data.email
    );
    if (usuarioExistente) {
      throw new Error("Email já cadastrado.");
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(data.senha, saltRounds);

    const usuario = new Usuario({
      id: randomUUID(),
      nome: data.nome,
      email: data.email,
      senha: senhaHash,
    });

    await this.usuarioRepository.salvar(usuario);
    return usuario;
  }
}
