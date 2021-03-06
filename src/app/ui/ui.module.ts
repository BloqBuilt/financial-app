import { NgModule } from '@angular/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { CardComponent } from './card/card.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { TableRowHeaderComponent } from './table-row-header/table-row-header.component';
import { TableRowComponent } from './table-row/table-row.component';
import { SummaryComponent } from './summary/summary.component';
import { CommonModule } from '@angular/common';
import { CardHeaderComponent } from './card-header/card-header.component';
import { PageScrollComponent } from './page-scroll/page-scroll.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TableEmptyComponent } from './table-empty/table-empty.component';
import { MaterialModule } from '../material';

const components = [
  PageHeaderComponent,
  PageScrollComponent,
  CardComponent,
  CardHeaderComponent,
  ChartComponent,
  PieChartComponent,
  TableRowComponent,
  TableRowHeaderComponent,
  TableEmptyComponent,
  SummaryComponent,
];

@NgModule({
  imports: [MaterialModule, CommonModule, ChartsModule],
  declarations: components,
  exports: [CommonModule, components, MaterialModule],
})
export class UiModule {}
