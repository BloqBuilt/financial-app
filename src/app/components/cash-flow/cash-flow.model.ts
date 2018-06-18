export enum CashFlowTypeEnum {
  Income = 'Income',
  Expense = 'Expense',
}

export interface ICashFlowItem {
  id: number;
  name: string;
  amount: number;
  financialType: CashFlowTypeEnum;
  isMonthly: boolean;
}

export class CashFlowItem implements ICashFlowItem {
  constructor(
    public id: number = null,
    public name: string = null,
    public amount: number = null,
    public financialType: CashFlowTypeEnum = null,
    public isMonthly: boolean = null,
  ) {}
}
