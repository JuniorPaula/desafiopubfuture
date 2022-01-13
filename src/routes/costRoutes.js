import { Router } from 'express';
import costsController from '../controllers/CostsController';

const router = Router();

router.post('/', costsController.create);
router.put('/:id', costsController.update);

export default router;
