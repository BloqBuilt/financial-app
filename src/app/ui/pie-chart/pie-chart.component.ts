import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input()
  chartData: Array<number[]> | number[] = [];
  @Input()
  chartLabels: Array<any> = [];
  @Input()
  chartColors: Array<any>;
  chartType = 'pie';

  constructor() {}

  ngOnInit() {}
}
