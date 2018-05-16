import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, filter, withLatestFrom, mergeMap } from 'rxjs/operators';
import {
  doesCollectionContainElements,
  combine,
  getAmount,
} from './common.selector';
import { ICashFlowItem, CashFlowTypeEnum } from '../../models/cash-flow-item';
import { Observable } from 'rxjs/Observable';

export const cashFlowCollectionSelector = store =>
  store.cashFlow.formState.controls.collection.controls;

export const cashFlowValueCollectionSelector = (store): ICashFlowItem[] =>
  store.cashFlow.formState.value.collection;

export const isExpense = (item: ICashFlowItem) =>
  item.financialType === CashFlowTypeEnum.Expense;

export const isIncome = (item: ICashFlowItem) =>
  item.financialType === CashFlowTypeEnum.Income;

export const cashFlowExpenseAmountSelector = (
  collection: ICashFlowItem[],
): number =>
  collection
    .filter(isExpense)
    .map(getAmount)
    .reduce(combine, 0);

export const cashFlowIncomeAmountSelector = (
  collection: ICashFlowItem[],
): number =>
  collection
    .filter(isIncome)
    .map(getAmount)
    .reduce(combine, 0);

@Injectable()
export class CashFlowSelectorService {
  constructor(private store: Store<any>) {}

  cashFlowCollection$ = this.store.select(cashFlowCollectionSelector);

  cashFlowIncome$: Observable<number> = this.store
    .select(cashFlowValueCollectionSelector)
    .pipe(
      filter(doesCollectionContainElements),
      map(cashFlowIncomeAmountSelector),
    );

  cashFlowExpense$: Observable<number> = this.store
    .select(cashFlowValueCollectionSelector)
    .pipe(
      filter(doesCollectionContainElements),
      map(cashFlowExpenseAmountSelector),
    );

  netCashFlow$ = this.cashFlowIncome$.pipe(
    withLatestFrom(this.cashFlowExpense$),
    filter(([a, b]) => a > 0 && b > 0),
    map(([expense, income]) => {
      return expense - income;
    }),
  );
}
