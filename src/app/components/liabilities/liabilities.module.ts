import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { LiabilitiesComponent } from './liabilities.component';
import { LiabilityEntryComponent } from './liability-entry/liability-entry.component';
import { reducer } from './liabilities.reducer';
import { NgrxFormsModule } from 'ngrx-forms';
import { LiabilitySummaryComponent } from './liability-summary/liability-summary.component';

const components = [
  LiabilitiesComponent,
  LiabilityEntryComponent,
  LiabilitySummaryComponent,
];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    MaterialModule,
    NgrxFormsModule,
    RouterModule.forChild([{ path: '', component: LiabilitiesComponent }]),
    StoreModule.forFeature('liabilities', reducer),
  ],
  declarations: components,
  exports: components,
})
export class LiabilitiesModule {}
