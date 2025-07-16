import { CriarUsuarioRequestSchema } from "./../application/use-cases/CriarUsuarioUseCase/types.js";
import { CriarUsuarioUseCase } from "./../application/use-cases/CriarUsuarioUseCase/index.js";
import { UsuarioRepositoryDrizzle } from "../infra/drizzle/usuarioRepositoryDrizzle.js";
import { LoginUsuarioUseCase } from "../application/use-cases/LoginUsuarioUseCase/index.js";
import { Router, Request, Response } from "express";
import { LoginUsuarioRequestSchema } from "../application/use-cases/LoginUsuarioUseCase/types.js";

const router = Router();
const usuarioRepository = new UsuarioRepositoryDrizzle();
const criarUsuarioUseCase  = new CriarUsuarioUseCase(usuarioRepository);
const loginUsuarioUseCase = new LoginUsuarioUseCase(usuarioRepository);


router.post('/usuario/cadastrar', async (req: Request, res: Response) => {
    try {
        const data = CriarUsuarioRequestSchema.parse(req.body);
        const usuario = await criarUsuarioUseCase.executar(data);
        res.status(201).json({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        });
    } catch( error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message});
        }
        else{
            res.status(500).json({error: 'Erro interno do servidor'})
        }
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {   

        const data = LoginUsuarioRequestSchema.parse(req.body);
        const login = await loginUsuarioUseCase.executar(data);
        res.json(login);
    } catch (error){
        if (error instanceof Error){
               res.status(400).json({error: error.message});
        }
        else{
             res.status(500).json({error: 'Erro interno do servidor'})
        
        }
    }
})

export default router;