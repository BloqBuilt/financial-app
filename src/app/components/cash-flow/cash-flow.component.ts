import { Component, HostBinding } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import {
  ICashFlowItem,
  CashFlowItem,
  CashFlowTypeEnum,
} from '../../models/cash-flow-item';
import { CashFlowSelectorService } from '../../store/selectors/cash-flow.selector';
import { Observable } from 'rxjs/Observable';
import { RemoveArrayControlAction, AddArrayControlAction } from 'ngrx-forms';
import { combineLatest } from 'rxjs/observable/combineLatest';

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
  tableHeaders: string[] = ['Name', 'Amount', 'Cash Flow Type'];

  cashFlowList$ = this.cashFlowSelectorService.cashFlowCollection$;
  chartData$ = this.cashFlowSelectorService.chartData$;
  summaryValues$: Observable<number[]> = combineLatest(
    this.cashFlowSelectorService.incomeAmount$,
    this.cashFlowSelectorService.expenseAmount$,
    this.cashFlowSelectorService.netCashFlow$,
  );

  constructor(
    private store: Store<any>,
    private actionsSubject: ActionsSubject,
    private cashFlowSelectorService: CashFlowSelectorService,
  ) {}

  trackByIndex(index: number) {
    return index;
  }

  addItem() {
    this.actionsSubject.next(
      new AddArrayControlAction<ICashFlowItem>(
        'cashFlow.collection',
        new CashFlowItem(),
      ),
    );
  }

  deleteItem(index: number) {
    this.actionsSubject.next(
      new RemoveArrayControlAction('cashFlow.collection', index),
    );
  }
}
