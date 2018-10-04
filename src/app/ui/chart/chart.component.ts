import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input()
  chartDataSets: Array<any> = [];
  @Input()
  chartLabels: Array<any> = [];
  @Input()
  chartType = 'line';
  @Input()
  chartColors: Array<any>;

  constructor() {}

  ngOnInit() {}
}
