import { Component, OnInit, HostBinding } from '@angular/core';
import {
  IAssetItem,
  AssetItem,
  AssetTypeEnum,
} from '../../components/assets/assets.model';
import { ActionsSubject } from '@ngrx/store';
import { AddArrayControlAction, RemoveArrayControlAction } from 'ngrx-forms';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { AssetsSelectorService } from './assets.selector';
import { GetAssetsHttpRequestAction } from './assets.action';

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

  assetList$ = this.assetsSelector.collection$;
  chartData$ = this.assetsSelector.chartData$;
  summaryValues$: Observable<number[]> = combineLatest(
    this.assetsSelector.realEstateAmount$,
    this.assetsSelector.investmentAmount$,
    this.assetsSelector.rrspAmount$,
    this.assetsSelector.tfsaAmount$,
    this.assetsSelector.totalAssetsAmount$,
  );

  constructor(
    private actionsSubject: ActionsSubject,
    private assetsSelector: AssetsSelectorService,
  ) {
    actionsSubject.next(new GetAssetsHttpRequestAction());
  }

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
