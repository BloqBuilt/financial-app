export class AssetRouterExpressRouter {
  static get(req, res) {
    console.log('hit asset');
    res.send({
      foo: 'asset',
    });
  }
}
