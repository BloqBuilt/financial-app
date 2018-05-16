import { Component, Input } from '@angular/core';
import {
  LiabilityItem,
  ILiabilityItem,
  LiabilityOptionList,
} from '../../../models/liability-item';
import { FormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-liability-entry',
  templateUrl: './liability-entry.component.html',
  styleUrls: ['./liability-entry.component.scss'],
})
export class LiabilityEntryComponent {
  @Input() formState: FormGroupState<ILiabilityItem>;
  private optionList = LiabilityOptionList;
}
