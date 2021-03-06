import { Component, Input } from '@angular/core';
import {
  IAssetItem,
  AssetItem,
  AssetTypeEnum,
} from '../../../components/assets/assets.model';
import { FormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-asset-entry',
  templateUrl: './asset-entry.component.html',
  styleUrls: ['./asset-entry.component.scss'],
})
export class AssetEntryComponent {
  @Input()
  formState: FormGroupState<IAssetItem>;
  optionList: AssetTypeEnum[] = [
    AssetTypeEnum.Investment,
    AssetTypeEnum.RealEstate,
    AssetTypeEnum.RRSP,
    AssetTypeEnum.TFSA,
  ];
}
