import {
  Component,
  OnInit,
  TemplateRef,
  ContentChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ContentChild('headerTemplate') headerTemplate: TemplateRef<ElementRef>;
  @ContentChild('offDayTemplate') offDayTemplate: TemplateRef<ElementRef>;
  @ContentChild('onDayTemplate') onDayTemplate: TemplateRef<ElementRef>;

  days = new Array(31).fill(0).map((v, i) => ({
    date: `Day ${i + 1}`,
    number: i + 1,
    isOffDay: Math.random() >= 0.5,
  }));

  constructor() {}

  ngOnInit() {}
}
