import { ISummary } from './summary.model';
import { GetSummaryHttpReceiveAction } from './summary.action';

export const INITIAL_STATE: ISummary = {
  assets: null,
  cashFlow: null,
  liabilities: null,
  income: null,
  expense: null,
  age: null,
  retirementAge: null,
  lifeExpectancy: null,
};

export const summaryReducer = (s: ISummary, a: GetSummaryHttpReceiveAction) => {
  switch (a.type) {
    case GetSummaryHttpReceiveAction.TYPE:
      return {
        assets: a.payload.assets,
        cashFlow: a.payload.cashFlow,
        liabilities: a.payload.liabilities,
        income: a.payload.income,
        expense: a.payload.expense,
        age: a.payload.age,
        retirementAge: a.payload.retirementAge,
        lifeExpectancy: a.payload.lifeExpectancy,
      };
  }
  return s;
};
