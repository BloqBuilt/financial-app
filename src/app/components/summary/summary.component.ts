import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActionsSubject } from '@ngrx/store';
import { GetSummaryHttpRequestAction } from './summary.action';
import { SummarySelectorService } from './summary.selector';
import { ISummary } from './summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  @HostBinding('class')
  classes = 'flex flex-column w-100';

  summary$: Observable<ISummary> = this.summarySelectorService.summary$;
  yearToRetire$: Observable<number> = this.summarySelectorService
    .yearsTillRetirement$;
  yearInRetirement$: Observable<number> = this.summarySelectorService
    .yearsInRetirement$;
  netWorth$: Observable<number> = this.summarySelectorService.netWorth$;
  summaryChartData$: Observable<number[]> = this.summarySelectorService
    .summaryChartData$;
  summaryChartLabels$: Observable<any[]> = this.summarySelectorService
    .summaryChartLabels$;

  constructor(
    actionsSubject: ActionsSubject,
    public summarySelectorService: SummarySelectorService,
  ) {
    actionsSubject.next(new GetSummaryHttpRequestAction());
  }
}
