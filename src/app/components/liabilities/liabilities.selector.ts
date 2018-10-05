import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LiabilityItem,
  LiabilityTypeEnum,
} from '../../components/liabilities/liabilities.model';
import { ILiabilityState } from '../../components/liabilities/liabilities.reducer';
import { FormArrayState, FormGroupState } from 'ngrx-forms';
import {
  doesCollectionContainElements,
  getAmount,
  combine,
} from '../../store/selectors/common.selector';

export const liabilitiesFeatureSelector = createFeatureSelector<
  ILiabilityState
>('liabilities');

export const liabilitiesCollectionSelector = createSelector(
  liabilitiesFeatureSelector,
  liabilities => liabilities.formState.controls.collection,
);

export const liabilitiesAutoSaveSelector = createSelector(
  liabilitiesCollectionSelector,
  collection =>
    (collection as FormArrayState<LiabilityItem>).controls
      .filter(
        (item: FormGroupState<LiabilityItem>) =>
          !item.isPristine && item.isValid && !item.isSubmitted,
      )
      .map(item => item.value),
);

export const liabilitiesValueCollectionSelector = createSelector(
  liabilitiesFeatureSelector,
  liabilities => liabilities.formState.value.collection,
);

export const isCreditCard = (item: LiabilityItem) =>
  item.financialType === LiabilityTypeEnum.CreditCard;

export const isLoan = (item: LiabilityItem) =>
  item.financialType === LiabilityTypeEnum.Loan;

export const isMortgage = (item: LiabilityItem) =>
  item.financialType === LiabilityTypeEnum.Mortgage;

export const aggregateCollection = (
  filterFunction: (item: LiabilityItem) => boolean,
) =>
  createSelector(liabilitiesValueCollectionSelector, collection => {
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
export const liabilitiesMortgageAmountSelector = aggregateCollection(
  isMortgage,
);

export const liabilitiesTotalAmountSelector = createSelector(
  liabilitiesCreditCardAmountSelector,
  liabilitiesLoanAmountSelector,
  liabilitiesMortgageAmountSelector,
  (creditCardAmount, loanAmount, mortgageAmount) =>
    creditCardAmount + loanAmount + mortgageAmount,
);

const chartData = createSelector(
  liabilitiesCreditCardAmountSelector,
  liabilitiesLoanAmountSelector,
  liabilitiesMortgageAmountSelector,
  (creditCardAmount, loanAmount, mortgageAmount) => [
    creditCardAmount || 0,
    loanAmount || 0,
    mortgageAmount || 0,
  ],
);

@Injectable()
export class LiabilitiesSelectorService {
  constructor(private store: Store<any>) {}

  collection$ = this.store.select(liabilitiesCollectionSelector);
  collectionAutoSave$ = this.store.select(liabilitiesAutoSaveSelector);

  creditCardAmount$: Observable<number> = this.store.select(
    liabilitiesCreditCardAmountSelector,
  );

  loanAmount$: Observable<number> = this.store.select(
    liabilitiesLoanAmountSelector,
  );

  mortgageAmount$: Observable<number> = this.store.select(
    liabilitiesMortgageAmountSelector,
  );

  totalAmount$: Observable<number> = this.store.select(
    liabilitiesTotalAmountSelector,
  );

  chartData$ = this.store.select(chartData);
}
