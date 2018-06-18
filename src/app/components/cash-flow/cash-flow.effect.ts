import { Injectable } from '@angular/core';
import { filter, debounceTime, map } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Http } from '@angular/http';
import { CashFlowSelectorService } from './cash-flow.selector';

@Injectable()
export class CashFlowEffect {
  isSavingInProgress = false;

  constructor(
    private http: Http,
    private actions$: Actions,
    cashFlowSelector: CashFlowSelectorService,
  ) {
    cashFlowSelector.collectionAutoSave$
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
