import { Injectable } from '@angular/core';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IAssetItem, AssetTypeEnum } from '../../models/asset-item';
import {
  IAssetsStore,
  IAssetsCollection,
} from '../../components/assets/assets.reducer';
import { AbstractControlState } from 'ngrx-forms';
import {
  doesCollectionContainElements,
  getAmount,
  combine,
} from './common.selector';

export const assetsFeature = createFeatureSelector<IAssetsStore>('assets');

export const assetCollectionSelector = createSelector(
  assetsFeature,
  assets => assets.formState.controls.collection,
);

export const assetValueCollectionSelector = createSelector(
  assetsFeature,
  assets => assets.formState.value.collection,
);

export const isInvestment = (item: IAssetItem) =>
  item.financialType === AssetTypeEnum.Investment;

export const isRealEstate = (item: IAssetItem) =>
  item.financialType === AssetTypeEnum.RealEstate;

export const isRRSP = (item: IAssetItem) =>
  item.financialType === AssetTypeEnum.RRSP;

export const isTFSA = (item: IAssetItem) =>
  item.financialType === AssetTypeEnum.TFSA;

export const aggregateCollection = (
  filterFunction: (item: IAssetItem) => boolean,
) =>
  createSelector(assetValueCollectionSelector, collection => {
    if (doesCollectionContainElements(collection)) {
      return collection
        .filter(filterFunction)
        .map(getAmount)
        .reduce(combine, 0);
    }
  });

export const InvestmentAmountSelector = aggregateCollection(isInvestment);
export const RealEstateAmountSelector = aggregateCollection(isRealEstate);
export const RRSPAmountSelector = aggregateCollection(isRRSP);
export const TFSAAmountSelector = aggregateCollection(isTFSA);

export const totalAssetsSelector = createSelector(
  InvestmentAmountSelector,
  RealEstateAmountSelector,
  RRSPAmountSelector,
  TFSAAmountSelector,
  (investmentAmount, realEstateAmount, rrspAmount, tfsaAmount) =>
    investmentAmount + realEstateAmount + rrspAmount + tfsaAmount,
);

// function getAssetTotalValue(
//   assetList: IAssetItem[] = [],
//   itemType: AssetTypeEnum,
// ): number {
//   let filteredAssetItems = assetList.filter(i => i.financialType === itemType);
//   if (filteredAssetItems.length > 0) {
//     let reduceAmmount = filteredAssetItems
//       .map(i => i.amount)
//       .reduce((a, b) => a + b);
//     return reduceAmmount;
//   } else {
//     return 0;
//   }
// }

// function transformAssetListIntoChartData(assetList: IAssetItem[] = []) {
//   let newDataSet: Number[] = [];
//   for (let itemType in AssetTypeEnum) {
//     let amount = this.getAssetTotalValue(assetList, itemType as AssetTypeEnum);
//     newDataSet.push(amount);
//   }
//   return [{ data: newDataSet }, { data: [] }, { data: [] }, { data: [] }];
// }

@Injectable()
export class AssetSelectorService {
  constructor(private store: Store<any>) {}

  assetCollection$: Observable<
    AbstractControlState<IAssetItem[]>
  > = this.store.select(assetCollectionSelector);

  assetInvestmentAmountSelector$ = this.store.select(InvestmentAmountSelector);
  assetRealEstateAmountSelector$ = this.store.select(RealEstateAmountSelector);
  assetRRSPAmountSelector$ = this.store.select(RRSPAmountSelector);
  assetTFSAAmountSelector$ = this.store.select(TFSAAmountSelector);
  totalAssetsAmountSelector$ = this.store.select(totalAssetsSelector);
}
