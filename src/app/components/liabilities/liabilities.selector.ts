import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Store,
  createFeatureSelector,
  MemoizedSelector,
  createSelector,
} from '@ngrx/store';
import {
  ILiabilityItem,
  LiabilityTypeEnum,
} from '../../components/liabilities/liabilities.model';
import { filter, map } from 'rxjs/operators';
import { ILiabilityState } from '../../components/liabilities/liabilities.reducer';
import {
  AbstractControlState,
  FormArrayState,
  FormGroupState,
} from 'ngrx-forms';
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
    (collection as FormArrayState<ILiabilityItem>).controls.filter(
      (item: FormGroupState<ILiabilityItem>) =>
        !item.isPristine && item.isValid,
    ),
);

export const liabilitiesValueCollectionSelector = createSelector(
  liabilitiesFeatureSelector,
  liabilities => liabilities.formState.value.collection,
);

export const isCreditCard = (item: ILiabilityItem) =>
  item.financialType === LiabilityTypeEnum.CreditCard;

export const isLoan = (item: ILiabilityItem) =>
  item.financialType === LiabilityTypeEnum.Loan;

export const isMortgage = (item: ILiabilityItem) =>
  item.financialType === LiabilityTypeEnum.Mortgage;

export const aggregateCollection = (
  filterFunction: (item: ILiabilityItem) => boolean,
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
    creditCardAmount,
    loanAmount,
    mortgageAmount,
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
