import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ISummary } from './summary.model';

export const summarySelector = store => store.summary;

export const yearsTillRetirementSelector = (summary: ISummary) => {
  if (summary && summary.retirementAge && summary.age) {
    return summary.retirementAge - summary.age;
  }
};

export const yearsInRetirementSelector = (summary: ISummary) => {
  if (summary && summary.lifeExpectancy && summary.retirementAge) {
    return summary.lifeExpectancy - summary.retirementAge;
  }
};

export const netWorthSelector = (summary: ISummary) => {
  if (summary && summary.assets && summary.liabilities) {
    return summary.assets - summary.liabilities;
  }
};

export const summaryChartLabelsSelector = (summary: ISummary) => {
  if (summary && summary.age && summary.lifeExpectancy) {
    let summaryChartLabels = [];
    for (let i = summary.age; i <= summary.lifeExpectancy; i++) {
      summaryChartLabels.push(i);
    }
    return summaryChartLabels;
  }
};

export const summaryChartDataSetsSelector = (summary: ISummary) => {
  const summaryChartLabels = summaryChartLabelsSelector(summary) || [];
  let summaryChartData = [];
  if (summary) {
    let lastNetWorthValue = netWorthSelector(summary);
    for (let i = 0; i <= summaryChartLabels.length; i++) {
      let yearsCashFlow = summary.cashFlow * 12;
      let currentNetWorthValue;
      if (summaryChartLabels[i] <= summary.retirementAge) {
        currentNetWorthValue = lastNetWorthValue + yearsCashFlow;
      }

      if (summaryChartLabels[i] > summary.retirementAge) {
        currentNetWorthValue = lastNetWorthValue - summary.expense;
      }

      lastNetWorthValue = currentNetWorthValue;

      summaryChartData.push(currentNetWorthValue);
    }
  }
  return [
    {
      data: summaryChartData,
      label: 'Net Worth',
    },
  ];
};

@Injectable()
export class SummarySelectorService {
  constructor(private store: Store<any>) {}

  summary$ = this.store.select(summarySelector);

  yearsTillRetirement$ = this.store
    .select(summarySelector)
    .pipe(map(yearsTillRetirementSelector));

  yearsInRetirement$ = this.store
    .select(summarySelector)
    .pipe(map(yearsInRetirementSelector));

  netWorth$ = this.store.select(summarySelector).pipe(map(netWorthSelector));

  summaryChartDataSets$ = this.store
    .select(summarySelector)
    .pipe(map(summaryChartDataSetsSelector));

  summaryChartLabels$ = this.store
    .select(summarySelector)
    .pipe(map(summaryChartLabelsSelector));
}
