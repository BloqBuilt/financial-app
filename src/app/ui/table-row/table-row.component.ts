import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent {
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
}
