import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Store,
  createFeatureSelector,
  MemoizedSelector,
  createSelector,
} from '@ngrx/store';
import { ILiabilityItem, LiabilityTypeEnum } from '../../models/liability-item';
import { filter, map } from 'rxjs/operators';
import {
  combine,
  doesCollectionContainElements,
  getAmount,
} from './common.selector';
import { ILiabilityState } from '../../components/liabilities/liabilities.reducer';
import { AbstractControlState } from 'ngrx-forms';

export const liabilitiesFeatureSelector = createFeatureSelector<
  ILiabilityState
>('liabilities');

export const liabilityCollectionSelector = createSelector(
  liabilitiesFeatureSelector,
  liabilities => liabilities.formState.controls.collection,
);

export const liabilityValueCollectionSelector = createSelector(
  liabilitiesFeatureSelector,
  liabilities => liabilities.formState.value.collection,
);

export const isCreditCard = (item: ILiabilityItem) =>
  item.financialType === LiabilityTypeEnum.CreditCard;

export const isLoan = (item: ILiabilityItem) =>
  item.financialType === LiabilityTypeEnum.Loan;

export const isMortage = (item: ILiabilityItem) =>
  item.financialType === LiabilityTypeEnum.Mortage;

export const aggregateCollection = (
  filterFunction: (item: ILiabilityItem) => boolean,
) =>
  createSelector(liabilityValueCollectionSelector, collection => {
    if (doesCollectionContainElements(collection)) {
      return collection
        .filter(filterFunction)
        .map(getAmount)
        .reduce(combine, 0);
    }
  });

export const liabilitiesCreditCardAmountSelector = aggregateCollection(
  isCreditCard,
);
export const liabilitiesLoanAmountSelector = aggregateCollection(isLoan);
export const liabilitiesMortgageAmountSelector = aggregateCollection(isMortage);

export const liabilitiesTotalAmountSelector = createSelector(
  liabilitiesCreditCardAmountSelector,
  liabilitiesLoanAmountSelector,
  liabilitiesMortgageAmountSelector,
  (creditCardAmount, loanAmount, mortgageAmount) =>
    creditCardAmount + loanAmount + mortgageAmount,
);

@Injectable()
export class LiabilitySelectorService {
  constructor(private store: Store<any>) {}

  liabilitiesCollection$: Observable<
    AbstractControlState<ILiabilityItem[]>
  > = this.store.select(liabilityCollectionSelector);

  liabilitiesCreditCardAmount$: Observable<number> = this.store.select(
    liabilitiesCreditCardAmountSelector,
  );

  liabilitiesLoanAmount$: Observable<number> = this.store.select(
    liabilitiesLoanAmountSelector,
  );

  liabilitiesMortageAmount$: Observable<number> = this.store.select(
    liabilitiesMortgageAmountSelector,
  );

  liabilitiesTotal$: Observable<number> = this.store.select(
    liabilitiesTotalAmountSelector,
  );
}
