import {
  createFormGroupState,
  createFormGroupReducerWithUpdate,
  formGroupReducer,
  validate,
  updateArray,
  updateGroup,
} from 'ngrx-forms';
import { combineReducers, Action } from '@ngrx/store';
import {
  required,
  greaterThan,
  greaterThanOrEqualTo,
} from 'ngrx-forms/validation';
import { ICashFlowItem, CashFlowTypeEnum } from '../../models/cash-flow-item';

interface ICashFlowStore {
  collection: ICashFlowItem[];
}

export const FORM_ID = 'cashFlow';

export const INITIAL_STATE = createFormGroupState<ICashFlowStore>(FORM_ID, {
  collection: [
    {
      id: 1,
      name: 'Hydro Bill',
      amount: 120,
      financialType: CashFlowTypeEnum.Expense,
      isMonthly: true,
    },
    {
      id: 2,
      name: 'Mobile Bill',
      amount: 60,
      financialType: CashFlowTypeEnum.Expense,
      isMonthly: true,
    },
    {
      id: 3,
      name: 'Income',
      amount: 1000,
      financialType: CashFlowTypeEnum.Income,
      isMonthly: true,
    },
  ],
});

const validationFormGroupReducer = createFormGroupReducerWithUpdate<
  ICashFlowStore
>({
  collection: updateArray<ICashFlowItem>(
    updateGroup<ICashFlowItem>({
      name: validate<string>(required),
      amount: validate<number>(required),
      financialType: validate<CashFlowTypeEnum>(required),
    }),
  ),
});

export const cashFlowReducer = (_s: any, _a: any) =>
  combineReducers<any, any>({
    formState(s = INITIAL_STATE, a: Action) {
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
