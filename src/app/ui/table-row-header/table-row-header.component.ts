import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-table-row-header',
  templateUrl: './table-row-header.component.html',
  styleUrls: ['./table-row-header.component.scss']
})
export class TableRowHeaderComponent {
  @Input() tableHeaders: string[];
  @Output() addItem: EventEmitter<any> = new EventEmitter();
}
