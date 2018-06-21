import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material';
import { UiModule } from '../../ui/ui.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { LiabilitiesComponent } from './liabilities.component';
import { LiabilityEntryComponent } from './liability-entry/liability-entry.component';
import { reducer } from './liabilities.reducer';
import { NgrxFormsModule } from 'ngrx-forms';
import { LiabilitiesSelectorService } from './liabilities.selector';
import { EffectsModule } from '@ngrx/effects';
import { LiabilitiesEffect } from './liabilities.effect';
import { BaseHttpService } from '../../api/base-http/base-http.service';

const components = [LiabilitiesComponent, LiabilityEntryComponent];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    MaterialModule,
    NgrxFormsModule,
    RouterModule.forChild([{ path: '', component: LiabilitiesComponent }]),
    StoreModule.forFeature('liabilities', reducer),
    EffectsModule.forFeature([LiabilitiesEffect]),
  ],
  providers: [BaseHttpService, LiabilitiesSelectorService],
  declarations: components,
  exports: components,
})
export class LiabilitiesModule {}
