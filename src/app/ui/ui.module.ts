import { NgModule } from '@angular/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { CardComponent } from './card/card.component';
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { TableRowHeaderComponent } from './table-row-header/table-row-header.component';
import { TableRowComponent } from './table-row/table-row.component';
import { CommonModule } from '@angular/common';

const components = [
  PageHeaderComponent,
  CardComponent,
  ChartComponent,
  TableRowComponent,
  TableRowHeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
  ],
  declarations: components,
  exports: components,
})
export class UiModule { }
