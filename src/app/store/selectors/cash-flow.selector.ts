import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { map, filter, withLatestFrom, mergeMap } from 'rxjs/operators';
import {
  doesCollectionContainElements,
  combine,
  getAmount,
} from './common.selector';
import { ICashFlowItem, CashFlowTypeEnum } from '../../models/cash-flow-item';
import { Observable } from 'rxjs/Observable';
import { ICashFlowStore } from '../../components/cash-flow/cash-flow.reducer';

export const cashFlowFeatureSelector = createFeatureSelector<ICashFlowStore>(
  'cashFlow',
);

export const cashFlowCollectionSelector = createSelector(
  cashFlowFeatureSelector,
  cashFlow => cashFlow.formState.controls.collection,
);

export const cashFlowValueCollectionSelector = createSelector(
  cashFlowFeatureSelector,
  cashFlow => cashFlow.formState.value.collection,
);

export const isExpense = (item: ICashFlowItem) =>
  item.financialType === CashFlowTypeEnum.Expense;

export const isIncome = (item: ICashFlowItem) =>
  item.financialType === CashFlowTypeEnum.Income;

export const aggregateCollection = (
  filterFunction: (item: ICashFlowItem) => boolean,
) =>
  createSelector(cashFlowValueCollectionSelector, collection => {
    if (doesCollectionContainElements(collection)) {
      return collection
        .filter(filterFunction)
        .map(getAmount)
        .reduce(combine, 0);
    }
  });

export const expenseAmountSelector = aggregateCollection(isExpense);
export const incomeAmountSelector = aggregateCollection(isIncome);

export const totalCashFlow = createSelector(
  expenseAmountSelector,
  incomeAmountSelector,
  (expenseAmount, incomeAmount) => expenseAmount + incomeAmount,
);

@Injectable()
export class CashFlowSelectorService {
  constructor(private store: Store<any>) {}

  cashFlowCollection$ = this.store.select(cashFlowCollectionSelector);

  incomeAmount$: Observable<number> = this.store.select(incomeAmountSelector);
  expenseAmount$: Observable<number> = this.store.select(expenseAmountSelector);
  netCashFlow$: Observable<number> = this.store.select(totalCashFlow);
}
