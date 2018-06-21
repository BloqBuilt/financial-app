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
import {
  ILiabilityItem,
  LiabilityTypeEnum,
} from '../../components/liabilities/liabilities.model';
import { combineReducers, Action } from '@ngrx/store';
import {
  required,
  greaterThan,
  greaterThanOrEqualTo,
} from 'ngrx-forms/validation';
import { GetLiabilitiesHttpResponseAction } from './liabilities.action';

export const FORM_ID = 'liabilities';

interface ILiabilityCollection {
  collection: Array<ILiabilityItem>;
}

export interface ILiabilityState {
  formState: FormGroupState<ILiabilityCollection>;
}

export const INITIAL_STATE = createFormGroupState<ILiabilityCollection>(
  FORM_ID,
  {
    collection: [],
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
    formState(s = INITIAL_STATE, a: GetLiabilitiesHttpResponseAction) {
      switch (a.type) {
        case GetLiabilitiesHttpResponseAction.TYPE:
          return createFormGroupState<ILiabilityCollection>(FORM_ID, {
            collection: a.payload,
          });
      }
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
}
