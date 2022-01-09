import { Router } from 'express';
import incomesController from '../controllers/IncomesController';

const router = Router();

router.post('/', incomesController.create);

export default router;
