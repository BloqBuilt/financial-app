import { createGuid } from '../../utils/guid';

export enum CashFlowTypeEnum {
  Income = 'Income',
  Expense = 'Expense',
}

export interface ICashFlowItem {
  id: number;
  name: string;
  amount: number;
  financialType: CashFlowTypeEnum;
}

export class CashFlowItem implements ICashFlowItem {
  id: number;
  name: string;
  amount: number;
  financialType: CashFlowTypeEnum;
  constructor(item: ICashFlowItem, public uiGuid: string = createGuid()) {
    this.id = item.id;
    this.name = item.name;
    this.amount = item.amount;
    this.financialType = item.financialType;
  }
}
