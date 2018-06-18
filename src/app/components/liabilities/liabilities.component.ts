import { Component, OnInit, HostBinding } from '@angular/core';
import {
  ILiabilityItem,
  LiabilityItem,
  LiabilityTypeEnum,
} from '../../models/liability-item';
import { Store, ActionsSubject, MemoizedSelector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AddArrayControlAction, RemoveArrayControlAction } from 'ngrx-forms';
import { LiabilitiesSelectorService } from '../../components/liabilities/liabilities.selectors';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { LiabilitiesAutoSaveService } from './liabilities.auto-save';

@Component({
  selector: 'app-liabilities',
  templateUrl: './liabilities.component.html',
  styleUrls: ['./liabilities.component.scss'],
})
export class LiabilitiesComponent {
  @HostBinding('class') classes = 'flex flex-column';

  summaryLabels: string[] = [
    LiabilityTypeEnum.CreditCard,
    LiabilityTypeEnum.Loan,
    LiabilityTypeEnum.Mortage,
    'Total Debt',
  ];
  chartLabels: LiabilityTypeEnum[] = [
    LiabilityTypeEnum.CreditCard,
    LiabilityTypeEnum.Loan,
    LiabilityTypeEnum.Mortage,
  ];
  tableHeaders: string[] = [
    'Name',
    'Amount',
    'Minimum Amount',
    'Liability Type',
  ];

  liabilityList$ = this.liabilitiesSelector.collection$;
  chartData$ = this.liabilitiesSelector.chartData$;
  summaryValues$: Observable<Array<number>> = combineLatest(
    this.liabilitiesSelector.creditCardAmount$,
    this.liabilitiesSelector.loanAmount$,
    this.liabilitiesSelector.mortageAmount$,
    this.liabilitiesSelector.totalAmount$,
  );

  constructor(
    private actionsSubject: ActionsSubject,
    public liabilitiesSelector: LiabilitiesSelectorService,
    private liabilitiesAutoSave: LiabilitiesAutoSaveService,
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
