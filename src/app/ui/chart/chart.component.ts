import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() chartData: Array<number[]> | number[] = [];
  @Input() chartLabels: Array<any> = [];
  @Input() chartType = 'pie';
  @Input() chartColors: Array<any>;

  constructor() {}

  ngOnInit() {}
}
