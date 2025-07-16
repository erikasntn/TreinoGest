import { Router } from 'express';
import treinosRoutes from './treinoRoutes.js'
import usuarioRoutes from './usuarioRoutes.js'

const router = Router();

router.use('/api', treinosRoutes);
router.use('/api', usuarioRoutes);

export default router