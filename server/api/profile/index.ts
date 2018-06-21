import { Router } from 'express';
import { ProfileExpressRouter } from './profile.controller';

const router = Router();

router.get('/', ProfileExpressRouter.get);
router.post('/', ProfileExpressRouter.post);

export const profileRouter = router;
