import { Router } from 'express';

import auth from './auth';
import todos from './todo';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/todos', todos);

export default router;
