import { Component, OnInit, HostBinding } from '@angular/core';
import {
  ILiabilityItem,
  LiabilityItem,
  LiabilityTypeEnum,
} from '../../models/liability-item';
import { Store, ActionsSubject, MemoizedSelector } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AddArrayControlAction, RemoveArrayControlAction } from 'ngrx-forms';
import { LiabilitySelectorService } from '../../store/selectors/liability.selector';
import { combineLatest } from 'rxjs/observable/combineLatest';

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

  liabilityList$ = this.liabilitySelectorService.liabilitiesCollection$;
  chartData$ = this.liabilitySelectorService.chartData$;
  summaryValues$: Observable<Array<number>> = combineLatest(
    this.liabilitySelectorService.liabilitiesCreditCardAmount$,
    this.liabilitySelectorService.liabilitiesLoanAmount$,
    this.liabilitySelectorService.liabilitiesMortageAmount$,
    this.liabilitySelectorService.liabilitiesTotal$,
  );

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
