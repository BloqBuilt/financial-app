import { Router } from 'express';
import { CashFlowExpressRouter } from './cash-flow.controller';

const router = Router();

router.get('', CashFlowExpressRouter.get);

export const cashFlowRouter = router;
