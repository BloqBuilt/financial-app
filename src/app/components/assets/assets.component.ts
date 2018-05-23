import { Component, OnInit } from '@angular/core';
import { IAssetItem, AssetItem } from '../../models/asset-item';
import { IPieChartRow } from '../../models/chart';
import { Store, ActionsSubject } from '@ngrx/store';
import { AddArrayControlAction, RemoveArrayControlAction } from 'ngrx-forms';
import { AssetSelectorService } from '../../store/selectors/asset.selector';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent {
  tableHeaders: string[] = ['Name', 'Amount', 'Asset Type'];

  private assetList$: Observable<IAssetItem[]> = this.assetSelectorService
    .assetCollection$;

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
