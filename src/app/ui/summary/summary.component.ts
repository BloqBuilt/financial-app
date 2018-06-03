import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  @Input() summaryLabels: string[] = [];
  @Input() summaryValues: number[] = [];
}
