export class ProfileExpressRouter {
  static get(req, res) {
    console.log('hit profile');

    res.send({
      name: 'Roman',
      age: 30,
      retirementAge: 50,
      lifeExpectancy: 90,
    });
  }
}
