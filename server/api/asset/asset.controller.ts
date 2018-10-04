import { mockData } from '../../mocks';

export class AssetRouterExpressRouter {
  static get(req, res) {
    console.log('GET - Assets');
    res.send(mockData.assets);
  }

  static post(req, res) {
    console.log('POST - Assets');
    console.log(req.body);
    res.send(req.body);
  }
}
