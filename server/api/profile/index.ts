import { Router } from 'express';
import { ProfileExpressRouter } from './profile.controller';

const router = Router();

router.get('/', ProfileExpressRouter.get);

export const profileRouter = router;
