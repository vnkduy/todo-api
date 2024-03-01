import { Router } from 'express';

import { checked, create, destroy, detail, list, update } from 'controllers/todos';

const router = Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', detail);
router.patch('/:id', update);
router.patch('/checked/:id', checked);
router.delete('/:id', destroy);

export default router;
