import { AssetTypeEnum } from '../../../src/app/components/assets/assets.model';

export class AssetRouterExpressRouter {
  static get(req, res) {
    console.log('GET - Assets');
    res.send([
      {
        id: 1,
        name: 'Home',
        amount: 100000,
        financialType: AssetTypeEnum.RealEstate,
      },
      {
        id: 2,
        name: 'Stocks',
        amount: 2000,
        financialType: AssetTypeEnum.Investment,
      },
      {
        id: 3,
        name: 'Bitcoin',
        amount: 5000,
        financialType: AssetTypeEnum.Investment,
      },
      {
        id: 4,
        name: 'RRSP Stocks',
        amount: 2000,
        financialType: AssetTypeEnum.RRSP,
      },
    ]);
  }

  static post(req, res) {
    console.log('POST - Assets');
    console.log(req.body);
    res.send(req.body);
  }
}
