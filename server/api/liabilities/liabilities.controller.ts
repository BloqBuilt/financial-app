import { LiabilityTypeEnum } from '../../../src/app/components/liabilities/liabilities.model';

export class LiabilitiesExpressRouter {
  static get(req, res) {
    console.log('GET - Liabilities');
    res.send([
      {
        id: 1,
        name: 'CIBC',
        amount: 560,
        minimumPayment: 10,
        financialType: LiabilityTypeEnum.CreditCard,
      },
      {
        id: 2,
        name: 'CIBC',
        amount: 4000,
        minimumPayment: 20,
        financialType: LiabilityTypeEnum.Loan,
      },
      {
        id: 3,
        name: 'CIBC',
        amount: 80000,
        minimumPayment: 8,
        financialType: LiabilityTypeEnum.Mortgage,
      },
    ]);
  }

  static post(req, res) {
    console.log('POST - Liabilities');
    console.log(req.body);
    res.send(req.body);
  }
}
