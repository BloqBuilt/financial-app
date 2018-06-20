import { Injectable } from '@angular/core';
import {
  filter,
  debounceTime,
  mergeMap,
  map,
  catchError,
} from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Http } from '@angular/http';
import { AssetsSelectorService } from './assets.selector';
import { Observable } from 'rxjs/Observable';
import { Action, ActionsSubject } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import {
  SaveAssetHttpRequestAction,
  SaveAssetHttpResponseAction,
  SaveAssetHttpErrorAction,
} from './assets.action';
import { IAssetItem } from './assets.model';

@Injectable()
export class AssetsEffect {
  isSavingInProgress = false;

  constructor(
    private http: Http,
    private actions$: Actions,
    private actionsSubject: ActionsSubject,
    assetsSelector: AssetsSelectorService,
  ) {
    assetsSelector.collectionAutoSave$
      .pipe(
        debounceTime(500),
        filter(data => data.length > 0),
      )
      .subscribe(data => {
        actionsSubject.next(new SaveAssetHttpRequestAction(data));
        this.isSavingInProgress = true;
      });
  }

  @Effect()
  saveAssets$: Observable<Action> = this.actions$
    .ofType(SaveAssetHttpRequestAction.TYPE)
    .pipe(
      mergeMap((action: SaveAssetHttpRequestAction) =>
        this.http.post('/assets/save', action.payload).pipe(
          map((data: any) => new SaveAssetHttpResponseAction(data)),
          // If successful, dispatch success action with result
          // If request fails, dispatch failed action
          catchError(() => of(new SaveAssetHttpErrorAction())),
        ),
      ),
    );
}
