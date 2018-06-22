import { Injectable } from '@angular/core';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AssetItem, AssetTypeEnum } from '../../components/assets/assets.model';
import { IAssetsStore } from '../../components/assets/assets.reducer';
import {
  AbstractControlState,
  FormArrayState,
  FormGroupState,
} from 'ngrx-forms';
import {
  doesCollectionContainElements,
  getAmount,
  combine,
} from '../../store/selectors/common.selector';

export const assetsFeature = createFeatureSelector<IAssetsStore>('assets');

export const assetCollectionSelector = createSelector(
  assetsFeature,
  assets => assets.formState.controls.collection as FormArrayState<AssetItem>,
);

export const assetsAutoSaveSelector = createSelector(
  assetCollectionSelector,
  collection =>
    collection.controls
      .filter(item => !item.isPristine && item.isValid && !item.isSubmitted)
      .map(item => item.value),
);

export const assetValueCollectionSelector = createSelector(
  assetsFeature,
  assets => assets.formState.value.collection,
);

export const isInvestment = (item: AssetItem) =>
  item.financialType === AssetTypeEnum.Investment;

export const isRealEstate = (item: AssetItem) =>
  item.financialType === AssetTypeEnum.RealEstate;

export const isRRSP = (item: AssetItem) =>
  item.financialType === AssetTypeEnum.RRSP;

export const isTFSA = (item: AssetItem) =>
  item.financialType === AssetTypeEnum.TFSA;

export const aggregateCollection = (
  filterFunction: (item: AssetItem) => boolean,
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

const assetChartDataSelector = createSelector(
  InvestmentAmountSelector,
  RealEstateAmountSelector,
  RRSPAmountSelector,
  TFSAAmountSelector,
  (investmentAmount, realEstateAmount, rrspAmount, tfsaAmount) => [
    investmentAmount || 0,
    realEstateAmount || 0,
    rrspAmount || 0,
    tfsaAmount || 0,
  ],
);

@Injectable()
export class AssetsSelectorService {
  constructor(private store: Store<any>) {}

  collection$ = this.store.select(assetCollectionSelector);
  collectionAutoSave$ = this.store.select(assetsAutoSaveSelector);

  investmentAmount$ = this.store.select(InvestmentAmountSelector);
  realEstateAmount$ = this.store.select(RealEstateAmountSelector);
  rrspAmount$ = this.store.select(RRSPAmountSelector);
  tfsaAmount$ = this.store.select(TFSAAmountSelector);
  totalAssetsAmount$ = this.store.select(totalAssetsSelector);

  chartData$ = this.store.select(assetChartDataSelector);
}
