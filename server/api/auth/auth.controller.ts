export class AuthRouterExpressRouter {
  static get(req, res) {
    console.log('GET - Auth');
    res.send({});
  }

  static post(req, res) {
    console.log('POST - Auth');
    console.log(req.body);
    res.send([]);
  }
}
