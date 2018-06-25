import { Component, OnInit, HostBinding } from '@angular/core';
import {
  ILiabilityItem,
  LiabilityItem,
  LiabilityTypeEnum,
} from '../../components/liabilities/liabilities.model';
import { ActionsSubject } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AddArrayControlAction, RemoveArrayControlAction } from 'ngrx-forms';
import { LiabilitiesSelectorService } from '../../components/liabilities/liabilities.selector';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { GetLiabilitiesHttpRequestAction } from './liabilities.action';

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
    LiabilityTypeEnum.Mortgage,
    'Total Debt',
  ];
  chartLabels: LiabilityTypeEnum[] = [
    LiabilityTypeEnum.CreditCard,
    LiabilityTypeEnum.Loan,
    LiabilityTypeEnum.Mortgage,
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
    this.liabilitiesSelector.mortgageAmount$,
    this.liabilitiesSelector.totalAmount$,
  );

  constructor(
    private actionsSubject: ActionsSubject,
    public liabilitiesSelector: LiabilitiesSelectorService,
  ) {
    actionsSubject.next(new GetLiabilitiesHttpRequestAction());
  }

  trackByIndex(index: number) {
    return index;
  }

  addItem() {
    this.actionsSubject.next(
      new AddArrayControlAction<ILiabilityItem>(
        'liabilities.collection',
        new LiabilityItem({
          id: null,
          name: null,
          amount: null,
          minimumPayment: null,
          financialType: null,
        }),
      ),
    );
  }

  deleteItem(index: number) {
    this.actionsSubject.next(
      new RemoveArrayControlAction('liabilities.collection', index),
    );
  }
}
