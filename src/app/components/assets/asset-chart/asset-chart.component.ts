import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-asset-chart',
  templateUrl: './asset-chart.component.html',
  styleUrls: ['./asset-chart.component.scss']
})
export class AssetChartComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit() {
  }

}
