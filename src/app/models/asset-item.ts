import { SelectOption, ISelectOption } from './select-option';

export enum AssetType {
  REAL_ESTATE = 'REAL_ESTATE',
  INVESTMENT = 'INVESTMENT',
  RRSP = 'RRSP',
  TFSA = 'TFSA',
}

export interface IAssetItem {
  id: number;
  name: string;
  amount: number;
  financialType: AssetType;
}

export class AssetItem implements IAssetItem {
  constructor(
    public name: string = '',
    public amount: number = 0,
    public financialType: AssetType = null,
    public id: number = undefined,
  ) {}
}

export const AssetOptionList: ISelectOption<AssetType>[] = [
  new SelectOption('Investment', AssetType.INVESTMENT),
  new SelectOption('Real Estate', AssetType.REAL_ESTATE),
  new SelectOption('TFSA', AssetType.TFSA),
  new SelectOption('RRSP', AssetType.RRSP),
];
