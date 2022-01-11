import { Router } from 'express';
import incomesController from '../controllers/IncomesController';

const router = Router();

router.post('/', incomesController.create);
router.put('/:id', incomesController.update);

export default router;
