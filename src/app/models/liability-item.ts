import { ISelectOption, SelectOption } from './select-option';

export enum LiabilityTypeEnum {
  CreditCard = 'CreditCard',
  Loan = 'Loan',
  Mortage = 'Mortage',
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

export const LiabilityOptionList: ISelectOption<LiabilityTypeEnum>[] = [
  new SelectOption('Credit Card', LiabilityTypeEnum.CreditCard),
  new SelectOption('Loan', LiabilityTypeEnum.Loan),
  new SelectOption('Mortage', LiabilityTypeEnum.Mortage),
];
