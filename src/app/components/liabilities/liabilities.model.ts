import { createGuid } from '../../utils/guid';

export enum LiabilityTypeEnum {
  CreditCard = 'CreditCard',
  Loan = 'Loan',
  Mortgage = 'Mortgage',
}

export interface ILiabilityItem {
  id: number;
  name: string;
  amount: number;
  minimumPayment: number;
  financialType: LiabilityTypeEnum;
}

export class LiabilityItem implements ILiabilityItem {
  id: number;
  name: string;
  amount: number;
  minimumPayment: number;
  financialType: LiabilityTypeEnum;
  constructor(item: ILiabilityItem, public uiGuid: string = createGuid()) {
    this.id = item.id;
    this.name = item.name;
    this.amount = item.amount;
    this.minimumPayment = item.minimumPayment;
    this.financialType = item.financialType;
  }
}
