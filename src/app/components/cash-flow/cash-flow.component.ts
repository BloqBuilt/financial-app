import { Component, HostBinding } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import {
  ICashFlowItem,
  CashFlowItem,
  CashFlowTypeEnum,
} from '../../components/cash-flow/cash-flow.model';
import { CashFlowSelectorService } from '../../components/cash-flow/cash-flow.selector';
import { Observable } from 'rxjs/Observable';
import { RemoveArrayControlAction, AddArrayControlAction } from 'ngrx-forms';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { GetCashFlowHttpRequestAction } from './cash-flow.action';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss'],
})
export class CashFlowComponent {
  @HostBinding('class') classes = 'flex flex-column';

  summaryLabels: string[] = [
    CashFlowTypeEnum.Income,
    CashFlowTypeEnum.Expense,
    'Total Cash Flow',
  ];
  chartLabels: CashFlowTypeEnum[] = [
    CashFlowTypeEnum.Income,
    CashFlowTypeEnum.Expense,
  ];
  chartColors: any[] = [{ backgroundColor: ['#19A974', '#FF4136'] }];
  tableHeaders: string[] = ['Name', 'Monthly Amount', 'Cash Flow Type'];

  cashFlowList$ = this.cashFlowSelector.collection$;
  chartData$ = this.cashFlowSelector.chartData$;
  summaryValues$: Observable<number[]> = combineLatest(
    this.cashFlowSelector.incomeAmount$,
    this.cashFlowSelector.expenseAmount$,
    this.cashFlowSelector.netCashFlow$,
  );

  constructor(
    private actionsSubject: ActionsSubject,
    private cashFlowSelector: CashFlowSelectorService,
  ) {
    actionsSubject.next(new GetCashFlowHttpRequestAction());
  }

  trackByIndex(index: number) {
    return index;
  }

  addItem() {
    this.actionsSubject.next(
      new AddArrayControlAction<CashFlowItem>(
        'cashFlow.collection',
        new CashFlowItem({
          id: null,
          name: null,
          amount: null,
          financialType: null,
        }),
      ),
    );
  }

  deleteItem(index: number) {
    this.actionsSubject.next(
      new RemoveArrayControlAction('cashFlow.collection', index),
    );
  }
}
