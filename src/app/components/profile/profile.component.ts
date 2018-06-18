import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs/Observable';
import { IProfile } from './profile.reducer';
import { ProfileSelectorService } from './profile.selector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @HostBinding('class') classes = 'flex flex-column w-100';

  profileControls$: Observable<FormGroupState<IProfile>> = this
    .profileSelectorService.profileControls$;
  yearToRetire$: Observable<number> = this.profileSelectorService
    .yearsTillRetirement$;
  yearInRetirement$: Observable<number> = this.profileSelectorService
    .yearsInRetirement$;

  constructor(public profileSelectorService: ProfileSelectorService) {}
}
