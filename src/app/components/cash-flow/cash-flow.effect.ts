import { Injectable } from '@angular/core';
import {
  filter,
  debounceTime,
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Response } from '@angular/http';
import { CashFlowSelectorService } from './cash-flow.selector';
import { Observable } from 'rxjs/Observable';
import { Action, ActionsSubject } from '@ngrx/store';
import {
  GetCashFlowHttpRequestAction,
  GetCashFlowHttpResponseAction,
  GetCashFlowHttpErrorAction,
  SaveCashFlowHttpRequestAction,
  SaveCashFlowHttpResponseAction,
  SaveCashFlowHttpErrorAction,
} from './cash-flow.action';
import { of } from 'rxjs/observable/of';
import { BaseHttpService } from '../../api/base-http/base-http.service';

@Injectable()
export class CashFlowEffect {
  isSavingInProgress = false;

  constructor(
    private actions$: Actions,
    private baseHttp: BaseHttpService,
    private actionsSubject: ActionsSubject,
    cashFlowSelector: CashFlowSelectorService,
  ) {
    cashFlowSelector.collectionAutoSave$
      .pipe(
        debounceTime(500),
        filter(data => data.length > 0),
      )
      .subscribe(data =>
        actionsSubject.next(new SaveCashFlowHttpRequestAction(data)),
      );
  }

  @Effect()
  getCashFlow$: Observable<Action> = this.actions$
    .ofType(GetCashFlowHttpRequestAction.TYPE)
    .pipe(
      mergeMap((action: GetCashFlowHttpRequestAction) =>
        this.baseHttp.getData('cash-flow').pipe(
          map((res: Response) => new GetCashFlowHttpResponseAction(res.json())),
          catchError(() => of(new GetCashFlowHttpErrorAction())),
        ),
      ),
    );

  @Effect()
  saveAssets$: Observable<Action> = this.actions$
    .ofType(SaveCashFlowHttpRequestAction.TYPE)
    .pipe(
      mergeMap((action: SaveCashFlowHttpRequestAction) =>
        this.baseHttp.postData('cash-flow', action.payload).pipe(
          map(
            (res: Response) => new SaveCashFlowHttpResponseAction(res.json()),
          ),
          catchError(() => of(new SaveCashFlowHttpErrorAction())),
        ),
      ),
    );
}
