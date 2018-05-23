import { Component, OnInit } from '@angular/core';
import { IAssetItem, AssetTypeEnum } from '../../../models/asset-item';

@Component({
  selector: 'app-asset-summary',
  templateUrl: './asset-summary.component.html',
  styleUrls: ['./asset-summary.component.scss'],
})
export class AssetSummaryComponent {
  private assetTypes: AssetTypeEnum[] = [
    AssetTypeEnum.Investment,
    AssetTypeEnum.RealEstate,
    AssetTypeEnum.RRSP,
    AssetTypeEnum.TFSA,
  ];

  organizeAssetList(assetList: IAssetItem[] = []): Array<any> {
    let organizedList = [];
    return this.assetTypes.map(assetType => {
      let amount = this.getAssetTotalValue(assetList, assetType);
      return {
        assetType,
        amount,
      };
    });
  }

  getAssetTotalValue(
    assetList: IAssetItem[] = [],
    itemType: AssetTypeEnum,
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
}
