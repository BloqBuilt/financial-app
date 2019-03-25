import { NgModule } from '@angular/core';
import { UiModule } from '../../ui/ui.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { BaseHttpService } from '../../api/base-http/base-http.service';
import { SummaryComponent } from './summary.component';
import { SummaryEffect } from './summary.effect';
import { SummarySelectorService } from './summary.selector';

const components = [SummaryComponent];
@NgModule({
  imports: [
    UiModule,
    RouterModule.forChild([{ path: '', component: SummaryComponent }]),
    EffectsModule.forFeature([SummaryEffect]),
  ],
  providers: [BaseHttpService, SummarySelectorService],
  declarations: components,
  exports: components,
})
export class SummaryModule {}
