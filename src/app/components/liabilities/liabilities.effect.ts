import { Injectable } from '@angular/core';
import { filter, debounceTime, map } from 'rxjs/operators';
import { LiabilitiesSelectorService } from '../../components/liabilities/liabilities.selector';
import { Actions, Effect } from '@ngrx/effects';
import { Http } from '@angular/http';

@Injectable()
export class LiabilitiesEffect {
  isSavingInProgress = false;

  constructor(
    private http: Http,
    private actions$: Actions,
    liabilitiesSelector: LiabilitiesSelectorService,
  ) {
    liabilitiesSelector.collectionAutoSave$
      .pipe(
        debounceTime(500),
        filter(data => data.length > 0),
      )
      .subscribe(data => {
        this.isSavingInProgress = true;
        // send data to API
      });
  }
}
