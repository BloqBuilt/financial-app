import {
  createFormGroupState,
  createFormGroupReducerWithUpdate,
  validate,
  updateArray,
  updateGroup,
  FormGroupState,
  markAsSubmitted,
  markAsUnsubmitted,
  markAsPristine,
  setValue,
} from 'ngrx-forms';
import { LiabilityItem } from '../../components/liabilities/liabilities.model';
import { combineReducers } from '@ngrx/store';
import { required } from 'ngrx-forms/validation';
import {
  GetLiabilitiesHttpResponseAction,
  SaveLiabilitiesHttpRequestAction,
  SaveLiabilitiesHttpResponseAction,
} from './liabilities.action';
import R = require('ramda');

export const FORM_ID = 'liabilities';

interface ILiabilityCollection {
  collection: Array<LiabilityItem>;
}

export interface ILiabilityState {
  formState: FormGroupState<ILiabilityCollection>;
}

export const createFormState = (collection: LiabilityItem[] = []) =>
  createFormGroupState<ILiabilityCollection>(FORM_ID, {
    collection,
  });

const validationFormGroupReducer = createFormGroupReducerWithUpdate<
  ILiabilityCollection
>({
  collection: updateArray<LiabilityItem>((tableRow, collection) => {
    const isNameUnique =
      collection.value.find(item => item.name === tableRow.value.name) ===
      undefined;

    return updateGroup<LiabilityItem>({
      name: validate<string>(required),
      amount: validate<number>(required),
      minimumPayment: validate<number>(required),
    })(tableRow);
  }),
});

const updateFormGroupBeforeSave = (
  s: FormGroupState<ILiabilityCollection>,
  a: SaveLiabilitiesHttpRequestAction,
) =>
  updateGroup<ILiabilityCollection>({
    collection: updateArray<LiabilityItem>(function(tableRow) {
      const correspondingItem = a.payload.find(
        item => item.uiGuid === tableRow.value.uiGuid,
      );

      if (correspondingItem !== undefined) {
        return markAsPristine(markAsSubmitted(tableRow));
      }
      return tableRow;
    }),
  })(s);

const updateFormGroupAfterSave = (
  s: FormGroupState<ILiabilityCollection>,
  a: SaveLiabilitiesHttpResponseAction,
) =>
  updateGroup<ILiabilityCollection>({
    collection: updateArray<LiabilityItem>(function(tableRow) {
      const correspondingItem = a.payload.find(
        item => item.uiGuid === tableRow.value.uiGuid,
      );

      if (correspondingItem !== undefined) {
        return R.pipe(
          markAsUnsubmitted,
          updateGroup<LiabilityItem>({
            id: setValue<number>(correspondingItem.id),
          }),
        )(tableRow);
      } else {
        return tableRow;
      }
    }),
  })(s);

export const liabilitiesReducer = (_s: any, _a: any) =>
  combineReducers<any, any>({
    formState(s = createFormState(), a: GetLiabilitiesHttpResponseAction) {
      switch (a.type) {
        case GetLiabilitiesHttpResponseAction.TYPE:
          return createFormState(
            a.payload.map(item => new LiabilityItem(item)),
          );
        case SaveLiabilitiesHttpRequestAction.TYPE:
          return updateFormGroupBeforeSave(s, a);
        case SaveLiabilitiesHttpResponseAction.TYPE:
          return updateFormGroupAfterSave(s, a);
      }
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
