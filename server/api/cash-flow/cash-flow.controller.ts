import { CashFlowTypeEnum } from '../../../src/app/components/cash-flow/cash-flow.model';

export class CashFlowExpressRouter {
  static get(req, res) {
    console.log('GET - Cash Flow');
    res.send([
      {
        id: 1,
        name: 'Hydro Bill',
        amount: 120,
        financialType: CashFlowTypeEnum.Expense,
      },
      {
        id: 2,
        name: 'Mobile Bill',
        amount: 60,
        financialType: CashFlowTypeEnum.Expense,
      },
      {
        id: 3,
        name: 'Income',
        amount: 1000,
        financialType: CashFlowTypeEnum.Income,
      },
    ]);
  }

  static post(req, res) {
    console.log('POST - Cash Flow');
    console.log(req.body);
    res.send([]);
  }
}
