import { Component, OnInit, HostBinding } from '@angular/core';
import { IAssetItem, AssetItem, AssetTypeEnum } from '../../models/asset-item';
import { IPieChartRow } from '../../models/chart';
import { Store, ActionsSubject } from '@ngrx/store';
import { AddArrayControlAction, RemoveArrayControlAction } from 'ngrx-forms';
import { AssetSelectorService } from '../../store/selectors/asset.selector';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent {
  @HostBinding('class') classes = 'flex flex-column';

  summaryLabels: string[] = [
    AssetTypeEnum.Investment,
    AssetTypeEnum.RealEstate,
    AssetTypeEnum.RRSP,
    AssetTypeEnum.TFSA,
    'Total Assets',
  ];
  chartLabels: AssetTypeEnum[] = [
    AssetTypeEnum.Investment,
    AssetTypeEnum.RealEstate,
    AssetTypeEnum.RRSP,
    AssetTypeEnum.TFSA,
  ];
  tableHeaders: string[] = ['Name', 'Amount', 'Asset Type'];

  assetList$ = this.assetSelectorService.assetCollection$;
  chartData$ = this.assetSelectorService.chartData$;
  summaryValues$: Observable<number[]> = combineLatest(
    this.assetSelectorService.realEstateAmount$,
    this.assetSelectorService.investmentAmount$,
    this.assetSelectorService.rrspAmount$,
    this.assetSelectorService.tfsaAmount$,
    this.assetSelectorService.totalAssetsAmount$,
  );

  constructor(
    private store: Store<any>,
    private actionsSubject: ActionsSubject,
    private assetSelectorService: AssetSelectorService,
  ) {}

  trackByIndex(index: number) {
    return index;
  }

  addItem() {
    this.actionsSubject.next(
      new AddArrayControlAction<IAssetItem>(
        'assets.collection',
        new AssetItem(),
      ),
    );
  }

  deleteItem(index: number) {
    this.actionsSubject.next(
      new RemoveArrayControlAction('assets.collection', index),
    );
  }
}
