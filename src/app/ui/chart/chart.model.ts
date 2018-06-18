// Chart Object

export interface IPieChartRow {
  data: Number[];
}

export interface ILineChartDataItem {
  data: Number[];
  label: string;
}

export class LineChartDataItem implements ILineChartDataItem {
  data: Number[];
  label: string;
  constructor(data: Number[], label: string) {
    this.data = data;
    this.label = label;
  }
}
