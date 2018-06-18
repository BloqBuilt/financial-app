import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material';
import { UiModule } from '../../ui/ui.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { LiabilitiesComponent } from './liabilities.component';
import { LiabilityEntryComponent } from './liability-entry/liability-entry.component';
import { reducer } from './liabilities.reducer';
import { NgrxFormsModule } from 'ngrx-forms';
import { LiabilitiesAutoSaveService } from './liabilities.auto-save';
import { LiabilitiesSelectorService } from './liabilities.selectors';

const components = [LiabilitiesComponent, LiabilityEntryComponent];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    MaterialModule,
    NgrxFormsModule,
    RouterModule.forChild([{ path: '', component: LiabilitiesComponent }]),
    StoreModule.forFeature('liabilities', reducer),
  ],
  providers: [LiabilitiesAutoSaveService, LiabilitiesSelectorService],
  declarations: components,
  exports: components,
})
export class LiabilitiesModule {}
