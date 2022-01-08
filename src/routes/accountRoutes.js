import { Router } from 'express';
import accountsController from '../controllers/AccountsController';

const router = Router();

router.get('/', accountsController.index);

export default router;
