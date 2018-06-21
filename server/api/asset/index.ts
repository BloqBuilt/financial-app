import { Router } from 'express';
import { AssetRouterExpressRouter } from './asset.controller';

const router = Router();

router.get('', AssetRouterExpressRouter.get);
router.post('', AssetRouterExpressRouter.post);

export const assetRouter = router;
