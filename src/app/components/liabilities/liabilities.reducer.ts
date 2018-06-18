import {
  createFormGroupState,
  createFormGroupReducerWithUpdate,
  formGroupReducer,
  validate,
  updateArray,
  updateGroup,
  FormGroupState,
  FormArrayState,
} from 'ngrx-forms';
import { ILiabilityItem, LiabilityTypeEnum } from '../../models/liability-item';
import { combineReducers, Action } from '@ngrx/store';
import {
  required,
  greaterThan,
  greaterThanOrEqualTo,
} from 'ngrx-forms/validation';

export const FORM_ID = 'liabilities';

interface ILiabilityCollection {
  collection: ILiabilityItem[];
}

export interface ILiabilityState {
  formState: FormGroupState<ILiabilityCollection>;
}

export const INITIAL_STATE = createFormGroupState<ILiabilityCollection>(
  FORM_ID,
  {
    collection: [
      {
        id: 1,
        name: 'CIBC',
        amount: 300,
        minimumPayment: 10,
        financialType: LiabilityTypeEnum.CreditCard,
      },
      {
        id: 2,
        name: 'CIBC',
        amount: 123,
        minimumPayment: 20,
        financialType: LiabilityTypeEnum.Loan,
      },
      {
        id: 3,
        name: 'CIBC',
        amount: 123,
        minimumPayment: 8,
        financialType: LiabilityTypeEnum.Mortage,
      },
    ],
  },
);

const validationFormGroupReducer = createFormGroupReducerWithUpdate<
  ILiabilityCollection
>({
  collection: updateArray<ILiabilityItem>(
    updateGroup<ILiabilityItem>({
      name: validate<string>(required),
      amount: validate<number>(required),
      minimumPayment: validate<number>(required),
    }),
  ),
});

export function reducer(_s: any, _a: any) {
  return combineReducers<any, any>({
    formState(s = INITIAL_STATE, a: Action) {
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
}
