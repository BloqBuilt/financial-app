import { Component, Input } from '@angular/core';
import {
  ILiabilityItem,
  LiabilityTypeEnum,
} from '../../../components/liabilities/liabilities.model';
import { FormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-liability-entry',
  templateUrl: './liability-entry.component.html',
  styleUrls: ['./liability-entry.component.scss'],
})
export class LiabilityEntryComponent {
  @Input() formState: FormGroupState<ILiabilityItem>;
  private optionList: LiabilityTypeEnum[] = [
    LiabilityTypeEnum.CreditCard,
    LiabilityTypeEnum.Loan,
    LiabilityTypeEnum.Mortgage,
  ];
}
