import { Router } from 'express';
import treinosRoutes from './treinoRoutes.js'

const router = Router();

router.use('/api', treinosRoutes);

export default router