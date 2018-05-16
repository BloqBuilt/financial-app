import { Component, OnInit } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs/Observable';
import { ProfileSelectorService } from '../../store/selectors/profile.selector';
import { IProfile } from './profile.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profileControls$: Observable<FormGroupState<IProfile>> = this
    .profileSelectorService.profileControls$;
  yearToRetire$: Observable<number> = this.profileSelectorService
    .yearsTillRetirement$;
  yearInRetirement$: Observable<number> = this.profileSelectorService
    .yearsInRetirement$;

  constructor(public profileSelectorService: ProfileSelectorService) {}
}
