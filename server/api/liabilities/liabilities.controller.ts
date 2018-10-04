import { mockData } from '../../mocks';

export class LiabilitiesExpressRouter {
  static get(req, res) {
    console.log('GET - Liabilities');
    res.send(mockData.liabilities);
  }

  static post(req, res) {
    console.log('POST - Liabilities');
    console.log(req.body);
    res.send(req.body);
  }
}
