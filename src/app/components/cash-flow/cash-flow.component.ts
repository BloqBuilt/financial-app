import { Component } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { ICashFlowItem, CashFlowItem } from '../../models/cash-flow-item';
import { CashFlowSelectorService } from '../../store/selectors/cash-flow.selector';
import { Observable } from 'rxjs/Observable';
import { RemoveArrayControlAction, AddArrayControlAction } from 'ngrx-forms';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss'],
})
export class CashFlowComponent {
  tableHeaders: string[] = ['Name', 'Amount', 'Cash Flow Type'];

  private cashFlowList$: Observable<ICashFlowItem[]> = this
    .cashFlowSelectorService.cashFlowCollection$;

  private cashFlowIncome$: Observable<number> = this.cashFlowSelectorService
    .cashFlowIncome$;
  private cashFlowExpense$: Observable<number> = this.cashFlowSelectorService
    .cashFlowExpense$;
  private netCashFlow$: Observable<number> = this.cashFlowSelectorService
    .netCashFlow$;

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
