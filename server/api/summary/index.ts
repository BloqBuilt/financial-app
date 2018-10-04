import { Router } from 'express';
import { SummaryExpressRouter } from './summary.controller';

const router = Router();

router.get('/', SummaryExpressRouter.get);

export const summaryRouter = router;
