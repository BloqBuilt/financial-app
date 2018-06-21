export class ProfileExpressRouter {
  localData = {
    name: 'Roman',
    age: 30,
    retirementAge: 50,
    lifeExpectancy: 90,
  };

  constructor() {}

  get(req, res) {
    res.send(this.localData);
  }

  save(req, res) {
    console.log(req);
    res.send(this.localData);
  }
}
