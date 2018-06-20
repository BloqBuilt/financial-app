import { Router } from 'express';
import { LiabilitiesExpressRouter } from './liabilities.controller';

const router = Router();

router.get('', LiabilitiesExpressRouter.get);

export const liabilitiesRouter = router;
