import {
  createFormGroupState,
  createFormGroupReducerWithUpdate,
  validate,
  updateArray,
  updateGroup,
  FormGroupState,
  setValue,
  markAsPristine,
  markAsSubmitted,
  markAsUnsubmitted,
} from 'ngrx-forms';
import { combineReducers } from '@ngrx/store';
import { required } from 'ngrx-forms/validation';
import {
  CashFlowTypeEnum,
  CashFlowItem,
} from '../../components/cash-flow/cash-flow.model';
import {
  GetCashFlowHttpResponseAction,
  SaveCashFlowHttpResponseAction,
  GetCashFlowHttpRequestAction,
  GetCashFlowHttpErrorAction,
  SaveCashFlowHttpRequestAction,
  SaveCashFlowHttpErrorAction,
  CashFlowHttpActions,
} from './cash-flow.action';
import R = require('ramda');

interface ICashFlowCollection {
  collection: CashFlowItem[];
}

export interface ICashFlowStore {
  formState: FormGroupState<ICashFlowCollection>;
  apiState: {
    requestCount: number;
    isApiError: boolean;
  };
}

export const FORM_ID = 'cashFlow';

export const createFormState = (collection: CashFlowItem[] = []) =>
  createFormGroupState<ICashFlowCollection>(FORM_ID, {
    collection,
  });

const validationFormGroupReducer = createFormGroupReducerWithUpdate<
  ICashFlowCollection
>({
  collection: updateArray<CashFlowItem>(
    updateGroup<CashFlowItem>({
      name: validate<string>(required),
      amount: validate<number>(required),
      financialType: validate<CashFlowTypeEnum>(required),
    }),
  ),
});

const updateFormGroupBeforeSave = (
  s: FormGroupState<ICashFlowCollection>,
  a: SaveCashFlowHttpRequestAction,
) =>
  updateGroup<ICashFlowCollection>({
    collection: updateArray<CashFlowItem>(function(tableRow) {
      const correspondingItem = a.payload.find(
        item => item.uiGuid === tableRow.value.uiGuid,
      );

      if (correspondingItem !== undefined) {
        return markAsSubmitted(tableRow);
      } else {
        return tableRow;
      }
    }),
  })(s);

const updateFormGroupAfterSave = (
  s: FormGroupState<ICashFlowCollection>,
  a: SaveCashFlowHttpResponseAction,
) =>
  updateGroup<ICashFlowCollection>({
    collection: updateArray<CashFlowItem>(function(tableRow) {
      const correspondingItem = a.payload.find(
        item => item.uiGuid === tableRow.value.uiGuid,
      );

      if (correspondingItem !== undefined) {
        return R.pipe(
          markAsUnsubmitted,
          markAsPristine,
          updateGroup<CashFlowItem>({
            id: setValue<number>(correspondingItem.id),
          }),
        )(tableRow);
      } else {
        return tableRow;
      }
    }),
  })(s);

export const cashFlowReducer = (_s: any, _a: any) =>
  combineReducers<any, any>({
    formState(
      s: FormGroupState<ICashFlowCollection> = createFormState(),
      a:
        | GetCashFlowHttpResponseAction
        | SaveCashFlowHttpRequestAction
        | SaveCashFlowHttpResponseAction,
    ) {
      switch (a.type) {
        case GetCashFlowHttpResponseAction.TYPE:
          return createFormState(a.payload.map(item => new CashFlowItem(item)));
        case SaveCashFlowHttpRequestAction.TYPE:
          return updateFormGroupBeforeSave(s, a);
        case SaveCashFlowHttpResponseAction.TYPE:
          return updateFormGroupAfterSave(s, a);
      }
      return validationFormGroupReducer(s, a);
    },
    apiState(
      s = {
        requestCount: 0,
        isApiError: false,
      },
      a: CashFlowHttpActions,
    ) {
      switch (a.type) {
        case GetCashFlowHttpRequestAction.TYPE:
        case SaveCashFlowHttpRequestAction.TYPE:
          return {
            ...s,
            requestCount: s.requestCount + 1,
          };
        case GetCashFlowHttpResponseAction.TYPE:
        case SaveCashFlowHttpResponseAction.TYPE:
          return {
            ...s,
            isApiError: false,
            requestCount: s.requestCount - 1,
          };
        case SaveCashFlowHttpErrorAction.TYPE:
        case GetCashFlowHttpErrorAction.TYPE:
          return {
            ...s,
            isApiError: true,
            requestCount: s.requestCount - 1,
          };
        default:
          return s;
      }
    },
  })(_s, _a);
