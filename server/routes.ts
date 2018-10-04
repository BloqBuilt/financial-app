import { assetRouter } from './api/asset';
import { cashFlowRouter } from './api/cash-flow';
import { liabilitiesRouter } from './api/liabilities';
import { profileRouter } from './api/profile';
import { summaryRouter } from './api/summary';

export const initializeRoutes = app => {
  app.use('/api/assets', assetRouter);
  app.use('/api/cash-flow', cashFlowRouter);
  app.use('/api/liabilities', liabilitiesRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/summary', summaryRouter);
};
