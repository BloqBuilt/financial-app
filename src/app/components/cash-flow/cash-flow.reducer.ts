import {
  createFormGroupState,
  createFormGroupReducerWithUpdate,
  formGroupReducer,
  validate,
  updateArray,
  updateGroup,
  FormGroupState,
  setValue,
  disable,
  enable,
} from 'ngrx-forms';
import { combineReducers, Action } from '@ngrx/store';
import {
  required,
  greaterThan,
  greaterThanOrEqualTo,
} from 'ngrx-forms/validation';
import {
  ICashFlowItem,
  CashFlowTypeEnum,
} from '../../components/cash-flow/cash-flow.model';

interface ICashFlowCollection {
  collection: ICashFlowItem[];
}

export interface ICashFlowStore {
  formState: FormGroupState<ICashFlowCollection>;
}

export const FORM_ID = 'cashFlow';

export const INITIAL_STATE = createFormGroupState<ICashFlowCollection>(
  FORM_ID,
  {
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
  },
);

const validationFormGroupReducer = createFormGroupReducerWithUpdate<
  ICashFlowCollection
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
