import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../ui/ui.module';
import { MaterialModule } from '../../material';
import { RouterModule } from '@angular/router';
import { NgrxFormsModule } from 'ngrx-forms';

import { AssetsComponent } from './assets.component';
import { AssetEntryComponent } from './asset-entry/asset-entry.component';
import { AssetsSelectorService } from './assets.selector';
import { EffectsModule } from '@ngrx/effects';
import { AssetsEffect } from './assets.effect';
import { BaseHttpService } from '../../api/base-http/base-http.service';

const components = [AssetsComponent, AssetEntryComponent];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    NgrxFormsModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: AssetsComponent }]),
    EffectsModule.forFeature([AssetsEffect]),
  ],
  providers: [BaseHttpService, AssetsSelectorService],
  declarations: components,
  exports: components,
})
export class AssetsModule {}
