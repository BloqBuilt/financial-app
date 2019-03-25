import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  @HostBinding('class')
  classes = 'flex flex-column w-100';

  constructor() {}

  ngOnInit() {}

  editDay(day: any) {
    console.log(day);
  }
}
