import { UsuarioRepository } from "../../../repositories/UsuarioRepository.js";
import { LoginUsuarioRequest, LoginUsuarioRequestSchema } from "./types.js";
import jwt from 'jsonwebtoken';

export class LoginUsuarioUseCase{
    constructor (private usuarioRepository: UsuarioRepository){}
    
    async executar(data: LoginUsuarioRequest): Promise<{ token: string; usuario: { id: string, nome: string; email: string} }>
    {
    LoginUsuarioRequestSchema.parse(data);

    const usuario = await this.usuarioRepository.buscarPorEmail(data.email);
    if(!usuario){
        throw new Error('Credenciais inválidas')
    }

    const secret = process.env.JWT_SECRET;
    if(!secret){
        throw new Error ('JWT não configurado')
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, secret, {expiresIn: '1h'})

    return{
        token,
        usuario:{
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        },
    };
    }
}