// src/routes/treinoRoutes.ts
import { Router, Request, Response } from 'express';
import { CriarTreinoUseCase } from '../application/use-cases/CriarTreinoUseCase/index.js';
import { TreinoRepositoryDrizzle } from '../infra/drizzle/treinoRepositoryDrizzle.js';
import { UsuarioRepositoryDrizzle } from '../infra/drizzle/usuarioRepositoryDrizzle.js';
import { CriarTreinoRequestSchema } from '../application/use-cases/CriarTreinoUseCase/types.js';


const router = Router();
const treinoRepository = new TreinoRepositoryDrizzle();
const usuarioRepository = new UsuarioRepositoryDrizzle();
const criarTreinoUseCase = new CriarTreinoUseCase(treinoRepository, usuarioRepository)

router.post('/treinos', async (req: Request, res: Response) => {
    try {
        const data = CriarTreinoRequestSchema.parse(req.body);
        const treino = await criarTreinoUseCase.executar(data);
        res.status(201).json(treino);
    } catch(error){
        if (error instanceof Error){
            res.status(400).json({error: error.message});
        }
        else {
            res.status(500).json({error: 'Erro interno servidor'})
        }
    }
});

export default router;