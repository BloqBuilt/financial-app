import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IAssetItem, AssetTypeEnum } from '../../models/asset-item';

export const assetControlCollectionSelector = (store): IAssetItem[] =>
  store.assets.formState.controls.collection.controls;

function getAssetTotalValue(
  assetList: IAssetItem[] = [],
  itemType: AssetTypeEnum,
): number {
  let filteredAssetItems = assetList.filter(i => i.financialType === itemType);
  if (filteredAssetItems.length > 0) {
    let reduceAmmount = filteredAssetItems
      .map(i => i.amount)
      .reduce((a, b) => a + b);
    return reduceAmmount;
  } else {
    return 0;
  }
}

function transformAssetListIntoChartData(assetList: IAssetItem[] = []) {
  let newDataSet: Number[] = [];
  for (let itemType in AssetTypeEnum) {
    let amount = this.getAssetTotalValue(assetList, itemType as AssetTypeEnum);
    newDataSet.push(amount);
  }
  return [{ data: newDataSet }, { data: [] }, { data: [] }, { data: [] }];
}

@Injectable()
export class AssetSelectorService {
  constructor(private store: Store<any>) {}

  assetCollection$: Observable<IAssetItem[]> = this.store.select(
    assetControlCollectionSelector,
  );
}
