import { Component, HostBinding } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  @HostBinding('class') classes = 'flex flex-column w-100';

  constructor(private actionsSubject: ActionsSubject) {}
}
