import { Router } from 'express';
import accountsController from '../controllers/AccountsController';

const router = Router();

router.get('/', accountsController.index);
router.post('/', accountsController.create);
router.put('/:id', accountsController.update);
router.delete('/:id', accountsController.delete);

router.get('/saldos', accountsController.getTotalBalance);

export default router;
