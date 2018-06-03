import { Component } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { ICashFlowItem, CashFlowItem } from '../../models/cash-flow-item';
import { CashFlowSelectorService } from '../../store/selectors/cash-flow.selector';
import { Observable } from 'rxjs/Observable';
import { RemoveArrayControlAction, AddArrayControlAction } from 'ngrx-forms';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss'],
  host: {
    class: 'flex flex-column',
  },
})
export class CashFlowComponent {
  summaryLabels: string[] = ['Income', 'Expense', 'Net Cash Flow'];
  tableHeaders: string[] = ['Name', 'Amount', 'Cash Flow Type'];

  cashFlowList$: Observable<ICashFlowItem[]> = this.cashFlowSelectorService
    .cashFlowCollection$;
  summaryValues$: Observable<number[]> = combineLatest(
    this.cashFlowSelectorService.cashFlowIncome$,
    this.cashFlowSelectorService.cashFlowExpense$,
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
