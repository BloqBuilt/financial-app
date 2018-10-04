import { AssetTypeEnum } from '../../src/app/components/assets/assets.model';
import { CashFlowTypeEnum } from '../../src/app/components/cash-flow/cash-flow.model';
import { LiabilityTypeEnum } from '../../src/app/components/liabilities/liabilities.model';

export let mockData = {
  profile: {
    name: 'Roman',
    age: 30,
    retirementAge: 50,
    lifeExpectancy: 90,
  },
  assets: [
    {
      id: 1,
      name: 'Home',
      amount: 100000,
      financialType: AssetTypeEnum.RealEstate,
    },
    {
      id: 2,
      name: 'Stocks',
      amount: 2000,
      financialType: AssetTypeEnum.Investment,
    },
    {
      id: 3,
      name: 'Bitcoin',
      amount: 5000,
      financialType: AssetTypeEnum.Investment,
    },
    {
      id: 4,
      name: 'RRSP Stocks',
      amount: 2000,
      financialType: AssetTypeEnum.RRSP,
    },
  ],
  cashFlow: [
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
  ],
  liabilities: [
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
  ],
};
