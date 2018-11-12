import { AssetItem, AssetTypeEnum } from '../../components/assets/assets.model';
import { combineReducers } from '@ngrx/store';
import {
  createFormStateReducerWithUpdate,
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
import * as R from 'ramda';

export const FORM_ID = 'assets';

export interface IAssetsCollection {
  collection: Array<AssetItem>;
}

export interface IAssetsStore {
  formState: FormGroupState<IAssetsCollection>;
}

function isNameUniqueValidator(isNameUnique: boolean) {
  return (value: string) => {
    return isNameUnique
      ? null
      : {
          nameNotUnique: {
            errorMessage: 'This message is not unique',
          },
        };
  };
}

const createFormState = (collection: AssetItem[] = []) =>
  createFormGroupState<IAssetsCollection>(FORM_ID, {
    collection,
  });

const updateFormState = updateGroup<IAssetsCollection>({
  collection: updateArray<AssetItem>((tableRow, collection) => {
    const isNameUnique =
      collection.value.find(
        item =>
          item.name === tableRow.value.name &&
          item.uiGuid !== tableRow.value.uiGuid,
      ) === undefined;

    return updateGroup<AssetItem>({
      name: validate<string>([required, isNameUniqueValidator(isNameUnique)]),
      amount: validate<number>(required),
      financialType: validate<AssetTypeEnum>(required),
    })(tableRow);
  }),
});

const validationFormGroupReducer = createFormStateReducerWithUpdate<
  IAssetsCollection
>(updateFormState);

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
      }
      return tableRow;
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

export function assetsReducer(_s: any, _a: any) {
  return combineReducers<any, any>({
    formState(s = createFormState(), a: GetAssetsHttpResponseAction) {
      switch (a.type) {
        case GetAssetsHttpResponseAction.TYPE:
          return createFormState(a.payload.map(item => new AssetItem(item)));
        case SaveAssetsHttpRequestAction.TYPE:
          return updateFormGroupBeforeSave(s, a);
        case SaveAssetsHttpResponseAction.TYPE:
          return updateFormGroupAfterSave(s, a);
      }
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
}
