import { createGuid } from '../../utils/guid';

export enum AssetTypeEnum {
  Cash = 'Cash',
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
  name: string;
  amount: number;
  financialType: AssetTypeEnum;
  id: number;
  constructor(item: IAssetItem, public uiGuid: string = createGuid()) {
    this.name = item.name;
    this.amount = item.amount;
    this.financialType = item.financialType;
    this.id = item.id;
  }
}
