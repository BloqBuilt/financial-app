import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import {
  CashFlowTypeEnum,
  ICashFlowItem,
} from '../../../components/cash-flow/cash-flow.model';

@Component({
  selector: 'app-cash-flow-entry',
  templateUrl: './cash-flow-entry.component.html',
  styleUrls: ['./cash-flow-entry.component.scss'],
})
export class CashFlowEntryComponent {
  @Input()
  formState: FormGroupState<ICashFlowItem>;
  typeOptions: CashFlowTypeEnum[] = [
    CashFlowTypeEnum.Expense,
    CashFlowTypeEnum.Income,
  ];
}
