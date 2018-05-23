import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ILiabilityItem, LiabilityTypeEnum } from '../../models/liability-item';
import { filter, map } from 'rxjs/operators';
import {
  combine,
  doesCollectionContainElements,
  getAmount,
} from './common.selector';

export const liabilityControlCollectionSelector = (store): ILiabilityItem[] =>
  store.liabilities.formState.controls.collection.controls;

export const liabilityValueCollectionSelector = (store): ILiabilityItem[] =>
  store.liabilities.formState.value.collection;

export const isCreditCard = (item: ILiabilityItem) =>
  item.financialType === LiabilityTypeEnum.CreditCard;

export const isLoan = (item: ILiabilityItem) =>
  item.financialType === LiabilityTypeEnum.Loan;

export const isMortage = (item: ILiabilityItem) =>
  item.financialType === LiabilityTypeEnum.Mortage;

export const liabilitiesCreditCardAmountSelector = (
  collection: ILiabilityItem[],
): number =>
  collection
    .filter(isCreditCard)
    .map(getAmount)
    .reduce(combine, 0);

export const liabilitiesLoanAmountSelector = (
  collection: ILiabilityItem[],
): number =>
  collection
    .filter(isLoan)
    .map(getAmount)
    .reduce(combine, 0);

export const liabilitiesMortgageAmountSelector = (
  collection: ILiabilityItem[],
): number =>
  collection
    .filter(isMortage)
    .map(getAmount)
    .reduce(combine, 0);

@Injectable()
export class LiabilitySelectorService {
  constructor(private store: Store<any>) {}

  liabilitiesCollection$: Observable<ILiabilityItem[]> = this.store.select(
    liabilityControlCollectionSelector,
  );

  liabilitiesCreditCardAmount$: Observable<number> = this.store
    .select(liabilityValueCollectionSelector)
    .pipe(
      filter(doesCollectionContainElements),
      map(liabilitiesCreditCardAmountSelector),
    );

  liabilitiesLoanAmount$: Observable<number> = this.store
    .select(liabilityValueCollectionSelector)
    .pipe(
      filter(doesCollectionContainElements),
      map(liabilitiesLoanAmountSelector),
    );

  liabilitiesMortageAmount$: Observable<number> = this.store
    .select(liabilityValueCollectionSelector)
    .pipe(
      filter(doesCollectionContainElements),
      map(liabilitiesMortgageAmountSelector),
    );
}
