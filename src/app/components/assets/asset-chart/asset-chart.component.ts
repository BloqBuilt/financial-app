import { Component, OnInit, Input } from '@angular/core';
import { AssetTypeEnum } from '../../../models/asset-item';

@Component({
  selector: 'app-asset-chart',
  templateUrl: './asset-chart.component.html',
  styleUrls: ['./asset-chart.component.scss'],
})
export class AssetChartComponent {
  chartLabels: AssetTypeEnum[] = [
    AssetTypeEnum.Investment,
    AssetTypeEnum.RealEstate,
    AssetTypeEnum.RRSP,
    AssetTypeEnum.TFSA,
  ];
}
