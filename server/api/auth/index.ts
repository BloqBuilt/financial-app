import { Router } from 'express';
import { AuthRouterExpressRouter } from './auth.controller';

const router = Router();

router.get('', AuthRouterExpressRouter.get);
router.post('', AuthRouterExpressRouter.post);

export const authRouter = router;
