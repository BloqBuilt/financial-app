import { Component, OnInit } from '@angular/core';
import {
  ILiabilityItem,
  LiabilityTypeEnum,
} from '../../../models/liability-item';
import { Observable } from 'rxjs/Observable';
import { LiabilitySelectorService } from '../../../store/selectors/liability.selector';

@Component({
  selector: 'app-liability-summary',
  templateUrl: './liability-summary.component.html',
  styleUrls: ['./liability-summary.component.scss'],
})
export class LiabilitySummaryComponent {
  private liabilitiesCreditCardAmount$: Observable<number> = this
    .liabilitySelectorService.liabilitiesCreditCardAmount$;
  private liabilitiesLoanAmount$: Observable<number> = this
    .liabilitySelectorService.liabilitiesLoanAmount$;
  private liabilitiesMortageAmount$: Observable<number> = this
    .liabilitySelectorService.liabilitiesMortageAmount$;

  constructor(public liabilitySelectorService: LiabilitySelectorService) {}
}
