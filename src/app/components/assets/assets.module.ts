import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../ui/ui.module';
import { MaterialModule } from '../../material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';

import { AssetsComponent } from './assets.component';
import { AssetChartComponent } from './asset-chart/asset-chart.component';
import { AssetEntryComponent } from './asset-entry/asset-entry.component';
import { AssetSummaryComponent } from './asset-summary/asset-summary.component';
import { assetListReducer } from './assets.reducer';

const components = [
  AssetsComponent,
  AssetChartComponent,
  AssetEntryComponent,
  AssetSummaryComponent,
];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    NgrxFormsModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: AssetsComponent }]),
    StoreModule.forFeature('assets', assetListReducer),
  ],
  declarations: components,
  exports: components,
})
export class AssetsModule {}
