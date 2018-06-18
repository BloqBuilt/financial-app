import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../ui/ui.module';
import { MaterialModule } from '../../material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';

import { AssetsComponent } from './assets.component';
import { AssetEntryComponent } from './asset-entry/asset-entry.component';
import { assetListReducer } from './assets.reducer';
import { AssetsSelectorService } from './assets.selector';
import { EffectsModule } from '@ngrx/effects';
import { AssetsEffect } from './assets.effect';

const components = [AssetsComponent, AssetEntryComponent];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    NgrxFormsModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: AssetsComponent }]),
    StoreModule.forFeature('assets', assetListReducer),
    EffectsModule.forFeature([AssetsEffect]),
  ],
  providers: [AssetsSelectorService],
  declarations: components,
  exports: components,
})
export class AssetsModule {}
