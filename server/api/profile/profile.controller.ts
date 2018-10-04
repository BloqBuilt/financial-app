import { mockData } from '../../mocks';

export class ProfileExpressRouter {
  constructor() {}

  static get(req, res) {
    console.log('GET - Profile');
    res.send(mockData.profile);
  }

  static post(req, res) {
    console.log('POST - Profile');
    console.log(req.body);
    mockData.profile = req.body;
    res.send(req.body);
  }
}
