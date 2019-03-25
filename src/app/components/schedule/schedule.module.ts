import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { UiModule } from '../../ui/ui.module';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { WeekChunkerPipe } from './calendar/week-chunker.pipe';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forChild([{ path: '', component: ScheduleComponent }]),
  ],
  declarations: [ScheduleComponent, CalendarComponent, WeekChunkerPipe],
  exports: [ScheduleComponent],
})
export class ScheduleModule {}
