import { Router } from 'express';
import { ProfileExpressRouter } from './profile.controller';

const router = Router();
const profileExpressRouter = new ProfileExpressRouter();

router.get('/', profileExpressRouter.get);

export const profileRouter = router;
