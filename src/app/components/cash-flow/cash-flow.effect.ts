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

  // @Effect()
  // saveAssets$: Observable<Action> = this.actions$
  //   .ofType(SaveAssetHttpRequestAction.TYPE)
  //   .pipe(
  //     mergeMap((action: SaveAssetHttpRequestAction) =>
  //       this.http.post('/assets/save', action.payload).pipe(
  //         map((data: any) => new SaveAssetHttpResponseAction(data)),
  //         // If successful, dispatch success action with result
  //         // If request fails, dispatch failed action
  //         catchError(() => of(new SaveAssetHttpErrorAction())),
  //       ),
  //     ),
  //   );
}
