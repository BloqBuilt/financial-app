import { AssetItem, AssetTypeEnum } from '../../components/assets/assets.model';
import { combineReducers, Action } from '@ngrx/store';
import {
  createFormGroupReducerWithUpdate,
  updateArray,
  updateGroup,
  validate,
  createFormGroupState,
  FormGroupState,
  setValue,
  markAsPristine,
  markAsUnsubmitted,
  markAsSubmitted,
} from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import {
  GetAssetsHttpResponseAction,
  SaveAssetsHttpRequestAction,
  SaveAssetsHttpResponseAction,
} from './assets.action';
import R = require('ramda');

export interface IAssetsCollection {
  collection: Array<AssetItem>;
}

export interface IAssetsStore {
  formState: FormGroupState<IAssetsCollection>;
}

export const FORM_ID = 'assets';

export const createFormState = (collection: AssetItem[] = []) =>
  createFormGroupState<IAssetsCollection>(FORM_ID, {
    collection,
  });

const validationFormGroupReducer = createFormGroupReducerWithUpdate<
  IAssetsCollection
>({
  collection: updateArray<AssetItem>(
    updateGroup<AssetItem>({
      name: validate<string>(required),
      amount: validate<number>(required),
      financialType: validate<AssetTypeEnum>(required),
    }),
  ),
});

const updateFormGroupBeforeSave = (
  s: FormGroupState<IAssetsCollection>,
  a: SaveAssetsHttpRequestAction,
) =>
  updateGroup<IAssetsCollection>({
    collection: updateArray<AssetItem>(function(tableRow) {
      const correspondingItem = a.payload.find(
        item => item.uiGuid === tableRow.value.uiGuid,
      );

      if (correspondingItem !== undefined) {
        return markAsPristine(markAsSubmitted(tableRow));
      } else {
        return tableRow;
      }
    }),
  })(s);

const updateFormGroupAfterSave = (
  s: FormGroupState<IAssetsCollection>,
  a: SaveAssetsHttpResponseAction,
) =>
  updateGroup<IAssetsCollection>({
    collection: updateArray<AssetItem>(function(tableRow) {
      const correspondingItem = a.payload.find(
        item => item.uiGuid === tableRow.value.uiGuid,
      );

      if (correspondingItem !== undefined) {
        return R.pipe(
          markAsUnsubmitted,
          updateGroup<AssetItem>({
            id: setValue<number>(correspondingItem.id),
          }),
        )(tableRow);
      } else {
        return tableRow;
      }
    }),
  })(s);

export const assetListReducer = (_s: any, _a: any) =>
  combineReducers<any, any>({
    formState(s = createFormState(), a: GetAssetsHttpResponseAction) {
      switch (a.type) {
        case GetAssetsHttpResponseAction.TYPE:
          return createFormGroupState<IAssetsCollection>(FORM_ID, {
            collection: a.payload,
          });
        case SaveAssetsHttpRequestAction.TYPE:
          return updateFormGroupBeforeSave(s, a);
        case SaveAssetsHttpResponseAction.TYPE:
          return updateFormGroupAfterSave(s, a);
      }
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
