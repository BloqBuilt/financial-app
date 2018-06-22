import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import {
  CashFlowItem,
  CashFlowTypeEnum,
} from '../../components/cash-flow/cash-flow.model';
import { Observable } from 'rxjs/Observable';
import { ICashFlowStore } from '../../components/cash-flow/cash-flow.reducer';
import {
  doesCollectionContainElements,
  getAmount,
  combine,
} from '../../store/selectors/common.selector';
import { FormArrayState, FormGroupState } from 'ngrx-forms';

export const cashFlowFeatureSelector = createFeatureSelector<ICashFlowStore>(
  'cashFlow',
);

export const cashFlowCollectionSelector = createSelector(
  cashFlowFeatureSelector,
  cashFlow =>
    cashFlow.formState.controls.collection as FormArrayState<CashFlowItem>,
);

export const cashFlowAutoSaveSelector = createSelector(
  cashFlowCollectionSelector,
  collection =>
    collection.controls
      .filter(item => !item.isPristine && item.isValid && !item.isSubmitted)
      .map(item => item.value),
);

export const cashFlowValueCollectionSelector = createSelector(
  cashFlowFeatureSelector,
  cashFlow => cashFlow.formState.value.collection,
);

export const isExpense = (item: CashFlowItem) =>
  item.financialType === CashFlowTypeEnum.Expense;

export const isIncome = (item: CashFlowItem) =>
  item.financialType === CashFlowTypeEnum.Income;

export const aggregateCollection = (
  filterFunction: (item: CashFlowItem) => boolean,
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
  incomeAmountSelector,
  expenseAmountSelector,
  (incomeAmount, expenseAmount) => incomeAmount - expenseAmount,
);

const chartData = createSelector(
  incomeAmountSelector,
  expenseAmountSelector,
  (incomeAmount, expenseAmount) => [incomeAmount, expenseAmount],
);

@Injectable()
export class CashFlowSelectorService {
  constructor(private store: Store<any>) {}

  collection$ = this.store.select(cashFlowCollectionSelector);
  collectionAutoSave$ = this.store.select(cashFlowAutoSaveSelector);

  incomeAmount$: Observable<number> = this.store.select(incomeAmountSelector);
  expenseAmount$: Observable<number> = this.store.select(expenseAmountSelector);
  netCashFlow$: Observable<number> = this.store.select(totalCashFlow);

  chartData$ = this.store.select(chartData);
}
