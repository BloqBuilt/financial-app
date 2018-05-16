import { Component, OnInit } from '@angular/core';
import {
  IAssetItem,
  AssetType,
  AssetItem,
  AssetOptionList,
} from '../../models/asset-item';
import { IPieChartRow } from '../../models/chart';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  tableHeaders: string[] = [
    'Name',
    'Amount',
    'Asset Type',
  ]

  private assetList: IAssetItem[] = [];
  private optionList = AssetOptionList;

  private chartDataSet: IPieChartRow[];
  private chartLabels;
  private displayAssetList: any[] = [];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select('assetList').subscribe((result: IAssetItem[]) => {
      this.assetList = result;
      this.chartDataSet = this.transformAssetListIntoChartData(result);
      this.chartLabels = this.transformAssetListIntoChartLabels(result);
      this.displayAssetList = this.organizeAssetList(result);
    });
  }

  organizeAssetList(assetList: IAssetItem[] = []): Array<any> {
    let organizedList = [];
    for (let itemType in AssetType) {
      let label = this.getAssetTypeLabel(itemType as AssetType);
      let amount = this.getAssetTotalValue(assetList, itemType as AssetType);
      organizedList.push({
        label,
        amount,
      });
    }
    return organizedList;
  }

  getAssetTypeLabel(itemType: AssetType): string {
    return this.optionList.find(i => i.value === itemType).label;
  }

  getAssetTotalValue(
    assetList: IAssetItem[] = [],
    itemType: AssetType,
  ): number {
    let filteredAssetItems = assetList.filter(
      i => i.financialType === itemType,
    );
    if (filteredAssetItems.length > 0) {
      let reduceAmmount = filteredAssetItems
        .map(i => i.amount)
        .reduce((a, b) => a + b);
      return reduceAmmount;
    } else {
      return 0;
    }
  }

  transformAssetListIntoChartData(assetList: IAssetItem[] = []) {
    let newDataSet: Number[] = [];
    for (let itemType in AssetType) {
      let amount = this.getAssetTotalValue(assetList, itemType as AssetType);
      newDataSet.push(amount);
    }
    return [{ data: newDataSet }, { data: [] }, { data: [] }, { data: [] }];
  }

  transformAssetListIntoChartLabels(assetList: IAssetItem[]) {
    let labelList: string[] = [];
    for (let item in AssetType) {
      labelList.push(this.optionList.find(i => i.value === item).label);
    }
    return labelList;
  }

  handleAssetAdd() {
    this.store.dispatch({
      type: 'ADD_ASSET_LIST_ITEM',
      payload: new AssetItem(),
    });
  }

  handleAssetUpdate(item: IAssetItem) {
    this.store.dispatch({
      type: 'UPDATE_ASSET_LIST_ITEM',
      payload: item,
    });
  }

  handleAssetDelete(item: IAssetItem) {
    this.store.dispatch({
      type: 'DELETE_ASSET_LIST_ITEM',
      payload: item,
    });
  }
}
