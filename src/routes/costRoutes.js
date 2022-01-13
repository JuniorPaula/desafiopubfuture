import { Router } from 'express';
import costsController from '../controllers/CostsController';

const router = Router();

router.post('/', costsController.create);
router.put('/:id', costsController.update);
router.delete('/:id', costsController.delete);

export default router;
