import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

export const profileControlsSelector = store =>
  store.profile.formState.controls;

export const yearsTillRetirementSelector = profile => {
  if (profile.retirementAge.isValid && profile.age.isValid) {
    return profile.retirementAge.value - profile.age.value;
  }
};

export const yearsInRetirementSelector = profile => {
  if (
    profile.retirementAge.isValid &&
    profile.lifeExpectancy.isValid &&
    profile.age.isValid
  ) {
    if (profile.retirementAge.value > profile.age.value) {
      return profile.lifeExpectancy.value - profile.retirementAge.value;
    }
    return profile.lifeExpectancy.value - profile.age.value;
  }
};

@Injectable()
export class ProfileSelectorService {
  constructor(private store: Store<any>) {}

  profileControls$ = this.store.select(profileControlsSelector);

  yearsTillRetirement$ = this.store
    .select(profileControlsSelector)
    .pipe(map(yearsTillRetirementSelector));

  yearsInRetirement$ = this.store
    .select(profileControlsSelector)
    .pipe(map(yearsInRetirementSelector));
}
