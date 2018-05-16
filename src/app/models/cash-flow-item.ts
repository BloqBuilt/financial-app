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
    public id: number = undefined,
    public name: string = undefined,
    public amount: number = undefined,
    public financialType: CashFlowTypeEnum = undefined,
    public isMonthly: boolean = undefined,
  ) {}
}
