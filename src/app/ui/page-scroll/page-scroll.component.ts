import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ui-page-scroll',
  templateUrl: './page-scroll.component.html',
  styleUrls: ['./page-scroll.component.scss'],
})
export class PageScrollComponent {
  @HostBinding('class') classes = 'flex';
}
