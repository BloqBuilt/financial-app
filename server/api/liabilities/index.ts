import { Router } from 'express';
import { LiabilitiesExpressRouter } from './liabilities.controller';

const router = Router();

router.get('', LiabilitiesExpressRouter.get);
router.post('', LiabilitiesExpressRouter.post);

export const liabilitiesRouter = router;
