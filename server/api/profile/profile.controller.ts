export class ProfileExpressRouter {
  constructor() {}

  static get(req, res) {
    console.log('GET - Profile');
    res.send({
      name: 'Roman',
      age: 30,
      retirementAge: 50,
      lifeExpectancy: 90,
    });
  }

  static post(req, res) {
    console.log('POST - Profile');
    console.log(req.body);
    res.send(req.body);
  }
}
