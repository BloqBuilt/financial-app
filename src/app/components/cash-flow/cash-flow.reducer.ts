import {
  createFormGroupState,
  createFormGroupReducerWithUpdate,
  validate,
  updateArray,
  updateGroup,
  FormGroupState,
} from 'ngrx-forms';
import { combineReducers } from '@ngrx/store';
import { required } from 'ngrx-forms/validation';
import {
  ICashFlowItem,
  CashFlowTypeEnum,
} from '../../components/cash-flow/cash-flow.model';
import { GetCashFlowHttpResponseAction } from './cash-flow.action';

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
    collection: [],
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
    formState(s = INITIAL_STATE, a: GetCashFlowHttpResponseAction) {
      switch (a.type) {
        case GetCashFlowHttpResponseAction.TYPE:
          return createFormGroupState<ICashFlowCollection>(FORM_ID, {
            collection: a.payload,
          });
      }
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
