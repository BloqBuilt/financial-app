import { assetRouter } from './api/asset';
import { cashFlowRouter } from './api/cash-flow';
import { liabilitiesRouter } from './api/liabilities';
import { profileRouter } from './api/profile';

export const initializeRoutes = app => {
  app.use('/api/asset', assetRouter);
  app.use('/api/cash-flow', cashFlowRouter);
  app.use('/api/liabilities', liabilitiesRouter);
  app.use('/api/profile', profileRouter);
};
