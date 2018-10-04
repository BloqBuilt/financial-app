export class SummaryExpressRouter {
  constructor() {}

  static get(req, res) {
    console.log('GET - Summary');
    res.send({
      assets: 109000,
      cashFlow: 820,
      income: 1000,
      expense: 180,
      liabilities: 84560,
      age: 30,
      retirementAge: 50,
      lifeExpectancy: 90,
    });
  }
}
