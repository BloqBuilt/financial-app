import { AssetItem, IAssetItem, AssetTypeEnum } from '../../models/asset-item';
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

export interface IAssetsCollection {
  collection: IAssetItem[];
}

export interface IAssetsStore {
  formState: FormGroupState<IAssetsCollection>;
}

export const FORM_ID = 'assets';

export const INITIAL_STATE = createFormGroupState<IAssetsCollection>(FORM_ID, {
  collection: [
    new AssetItem('Home', 30000, AssetTypeEnum.RealEstate, 1),
    new AssetItem('Stocks', 5000, AssetTypeEnum.Investment, 2),
    new AssetItem('Bitcoin', 5000, AssetTypeEnum.Investment, 3),
    new AssetItem('RRSP Stocks', 2000, AssetTypeEnum.RRSP, 4),
  ],
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
    formState(s = INITIAL_STATE, a: Action) {
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
