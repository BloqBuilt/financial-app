import { Router } from 'express';
import { AssetRouterExpressRouter } from './asset.controller';

const router = Router();

router.get('', AssetRouterExpressRouter.get);

export const assetRouter = router;
