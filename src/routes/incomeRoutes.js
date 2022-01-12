import { Router } from 'express';
import incomesController from '../controllers/IncomesController';

const router = Router();

router.post('/', incomesController.create);
router.put('/:id', incomesController.update);
router.delete('/:id', incomesController.delete);

router.get('/', incomesController.showIncomeOfType);
router.get('/filter', incomesController.getIncomesToDate);

export default router;
