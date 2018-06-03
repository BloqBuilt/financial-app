import { Component } from '@angular/core';
import { Navigation, INavigation } from './models/navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'h-100'
  }
})
export class AppComponent {
  private isMenuToggled: boolean = false;
  private menuList: INavigation[] = [
    new Navigation('person', 'My Profile', '/profile'),
    new Navigation('work', 'Cash Flow', '/cash-flow'),
    new Navigation('trending_up', 'Assets', '/assets'),
    new Navigation('payment', 'Liabilities', '/liabilities'),
  ];

  constructor() { }

  onMenuToggle() {
    this.isMenuToggled = !this.isMenuToggled;
  }
}
