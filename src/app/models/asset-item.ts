import { SelectOption, ISelectOption } from './select-option';

export enum AssetTypeEnum {
  RealEstate = 'Real Estate',
  Investment = 'Investment',
  RRSP = 'RRSP',
  TFSA = 'TFSA',
}

export interface IAssetItem {
  id: number;
  name: string;
  amount: number;
  financialType: AssetTypeEnum;
}

export class AssetItem implements IAssetItem {
  constructor(
    public name: string = null,
    public amount: number = null,
    public financialType: AssetTypeEnum = null,
    public id: number = null,
  ) {}
}
