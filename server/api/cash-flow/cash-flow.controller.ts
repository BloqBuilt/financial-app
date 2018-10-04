import { mockData } from '../../mocks';

export class CashFlowExpressRouter {
  static get(req, res) {
    console.log('GET - Cash Flow');
    res.send(mockData.cashFlow);
  }

  static post(req, res) {
    console.log('POST - Cash Flow');
    console.log(req.body);
    res.send(req.body);
  }
}
