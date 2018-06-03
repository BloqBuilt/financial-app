import { Component, OnInit } from '@angular/core';
import { ILiabilityItem, LiabilityItem } from '../../models/liability-item';
import { Store, ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AddArrayControlAction, RemoveArrayControlAction } from 'ngrx-forms';
import { LiabilitySelectorService } from '../../store/selectors/liability.selector';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-liabilities',
  templateUrl: './liabilities.component.html',
  styleUrls: ['./liabilities.component.scss'],
  host: {
    class: 'flex flex-column',
  },
})
export class LiabilitiesComponent {
  summaryLabels: string[] = ['Credit Card', 'Loan', 'Mortage'];
  tableHeaders: string[] = [
    'Name',
    'Amount',
    'Minimum Amount',
    'Liability Type',
  ];

  summaryValues$: Observable<Array<number>> = combineLatest(
    this.liabilitySelectorService.liabilitiesCreditCardAmount$,
    this.liabilitySelectorService.liabilitiesLoanAmount$,
    this.liabilitySelectorService.liabilitiesMortageAmount$,
  );

  liabilityList$: Observable<ILiabilityItem[]> = this.liabilitySelectorService
    .liabilitiesCollection$;

  constructor(
    private actionsSubject: ActionsSubject,
    public liabilitySelectorService: LiabilitySelectorService,
  ) {}

  trackByIndex(index: number) {
    return index;
  }

  addItem() {
    this.actionsSubject.next(
      new AddArrayControlAction<ILiabilityItem>(
        'liabilities.collection',
        new LiabilityItem(),
      ),
    );
  }

  deleteItem(index: number) {
    this.actionsSubject.next(
      new RemoveArrayControlAction('liabilities.collection', index),
    );
  }
}
