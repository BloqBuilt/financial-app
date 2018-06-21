import {
  AssetItem,
  IAssetItem,
  AssetTypeEnum,
} from '../../components/assets/assets.model';
import { combineReducers, Action } from '@ngrx/store';
import {
  createFormGroupReducerWithUpdate,
  updateArray,
  updateGroup,
  validate,
  createFormGroupState,
  FormGroupState,
} from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { GetAssetsHttpResponseAction } from './assets.action';

export interface IAssetsCollection {
  collection: Array<IAssetItem>;
}

export interface IAssetsStore {
  formState: FormGroupState<IAssetsCollection>;
}

export const FORM_ID = 'assets';

export const INITIAL_STATE = createFormGroupState<IAssetsCollection>(FORM_ID, {
  collection: [],
});

const validationFormGroupReducer = createFormGroupReducerWithUpdate<
  IAssetsCollection
>({
  collection: updateArray<IAssetItem>(
    updateGroup<IAssetItem>({
      name: validate<string>(required),
      amount: validate<number>(required),
      financialType: validate<AssetTypeEnum>(required),
    }),
  ),
});

export const assetListReducer = (_s: any, _a: any) =>
  combineReducers<any, any>({
    formState(s = INITIAL_STATE, a: GetAssetsHttpResponseAction) {
      switch (a.type) {
        case GetAssetsHttpResponseAction.TYPE:
          return createFormGroupState<IAssetsCollection>(FORM_ID, {
            collection: a.payload,
          });
      }
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
