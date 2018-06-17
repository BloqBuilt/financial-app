import { Component, OnInit, HostBinding } from '@angular/core';
import { IAssetItem, AssetItem } from '../../models/asset-item';
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
    'Real Estate',
    'Investment',
    'RRSP',
    'TFSA',
    'Total Assets',
  ];
  tableHeaders: string[] = ['Name', 'Amount', 'Asset Type'];

  private assetList$ = this.assetSelectorService.assetCollection$;

  summaryValues$: Observable<number[]> = combineLatest(
    this.assetSelectorService.assetRealEstateAmountSelector$,
    this.assetSelectorService.assetInvestmentAmountSelector$,
    this.assetSelectorService.assetRRSPAmountSelector$,
    this.assetSelectorService.assetTFSAAmountSelector$,
    this.assetSelectorService.totalAssetsAmountSelector$,
  );

  private chartDataSet: IPieChartRow[];
  private chartLabels;
  private displayAssetList: any[] = [];

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
