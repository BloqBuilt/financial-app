import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {
  IAssetItem,
  AssetType,
  AssetItem,
  AssetOptionList,
} from '../../../models/asset-item';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'app-asset-entry',
  templateUrl: './asset-entry.component.html',
  styleUrls: ['./asset-entry.component.scss'],
})
export class AssetEntryComponent implements OnInit, OnDestroy {
  @Input() data: IAssetItem;
  @Output() updateItem: EventEmitter<IAssetItem> = new EventEmitter();
  private optionList = AssetOptionList;

  assetItem: FormGroup;
  formData: Subscription;

  constructor() {}

  ngOnInit() {
    this.assetItem = new FormGroup({
      name: new FormControl(this.getValueFromData('name')),
      amount: new FormControl(this.getValueFromData('amount')),
      financialType: new FormControl(this.getValueFromData('financialType')),
    });

    this.formData = this.assetItem.valueChanges.subscribe(updatedValues => {
      if (this.assetItem.valid) {
        this.updateItem.emit(
          new AssetItem(
            updatedValues.name,
            updatedValues.amount,
            updatedValues.financialType,
            this.data.id,
          ),
        );
      }
    });
  }

  ngOnDestroy() {
    this.formData.unsubscribe();
  }

  getValueFromData(key, defaultValue = 0) {
    return _.get(this.data, key, defaultValue);
  }
}
