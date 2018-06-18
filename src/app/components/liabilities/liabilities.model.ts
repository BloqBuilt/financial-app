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
  constructor(
    public id: number = null,
    public name: string = null,
    public amount: number = null,
    public minimumPayment: number = null,
    public financialType: LiabilityTypeEnum = null,
  ) {}
}
