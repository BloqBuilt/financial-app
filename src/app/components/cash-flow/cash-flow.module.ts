import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../ui/ui.module';
import { MaterialModule } from '../../material';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';

import { CashFlowComponent } from './cash-flow.component';
import { CashFlowEntryComponent } from './cash-flow-entry/cash-flow-entry.component';
import { EffectsModule } from '@ngrx/effects';
import { CashFlowEffect } from './cash-flow.effect';
import { CashFlowSelectorService } from './cash-flow.selector';
import { BaseHttpService } from '../../api/base-http/base-http.service';

const components = [CashFlowComponent, CashFlowEntryComponent];

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    NgrxFormsModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: CashFlowComponent }]),
    EffectsModule.forFeature([CashFlowEffect]),
  ],
  providers: [BaseHttpService, CashFlowSelectorService],
  declarations: components,
  exports: components,
})
export class CashFlowModule {}
