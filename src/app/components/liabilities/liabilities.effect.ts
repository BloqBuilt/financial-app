import { Injectable } from '@angular/core';
import {
  filter,
  debounceTime,
  map,
  mergeMap,
  catchError,
} from 'rxjs/operators';
import { LiabilitiesSelectorService } from '../../components/liabilities/liabilities.selector';
import { Actions, Effect } from '@ngrx/effects';
import { Http, Response } from '@angular/http';
import {
  GetLiabilitiesHttpRequestAction,
  GetLiabilitiesHttpResponseAction,
  GetLiabilitiesHttpErrorAction,
  SaveLiabilitiesHttpRequestAction,
  SaveLiabilitiesHttpResponseAction,
  SaveLiabilitiesHttpErrorAction,
} from './liabilities.action';
import { Observable } from 'rxjs/Observable';
import { Action, ActionsSubject } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { BaseHttpService } from '../../api/base-http/base-http.service';

@Injectable()
export class LiabilitiesEffect {
  isSavingInProgress = false;

  constructor(
    private actions$: Actions,
    private baseHttp: BaseHttpService,
    private actionsSubject: ActionsSubject,
    liabilitiesSelector: LiabilitiesSelectorService,
  ) {
    liabilitiesSelector.collectionAutoSave$
      .pipe(
        debounceTime(500),
        filter(data => data.length > 0),
      )
      .subscribe(data =>
        actionsSubject.next(new SaveLiabilitiesHttpRequestAction(data)),
      );
  }

  @Effect()
  getCashFlow$: Observable<Action> = this.actions$
    .ofType(GetLiabilitiesHttpRequestAction.TYPE)
    .pipe(
      mergeMap((action: GetLiabilitiesHttpRequestAction) =>
        this.baseHttp.getData('liabilities').pipe(
          map(
            (res: Response) => new GetLiabilitiesHttpResponseAction(res.json()),
          ),
          catchError(() => of(new GetLiabilitiesHttpErrorAction())),
        ),
      ),
    );

  @Effect()
  saveAssets$: Observable<Action> = this.actions$
    .ofType(SaveLiabilitiesHttpRequestAction.TYPE)
    .pipe(
      mergeMap((action: SaveLiabilitiesHttpRequestAction) =>
        this.baseHttp.postData('liabilities', action.payload).pipe(
          map(
            (res: Response) =>
              new SaveLiabilitiesHttpResponseAction(res.json()),
          ),
          catchError(() => of(new SaveLiabilitiesHttpErrorAction())),
        ),
      ),
    );
}
