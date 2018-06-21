import { Injectable } from '@angular/core';
import {
  filter,
  debounceTime,
  mergeMap,
  map,
  catchError,
} from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Http, Response } from '@angular/http';
import { AssetsSelectorService } from './assets.selector';
import { Observable } from 'rxjs/Observable';
import { Action, ActionsSubject } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import {
  SaveAssetsHttpRequestAction,
  SaveAssetsHttpResponseAction,
  SaveAssetsHttpErrorAction,
  GetAssetsHttpRequestAction,
  GetAssetsHttpResponseAction,
  GetAssetsHttpErrorAction,
} from './assets.action';
import { IAssetItem } from './assets.model';
import { BaseHttpService } from '../../api/base-http/base-http.service';

@Injectable()
export class AssetsEffect {
  constructor(
    private actions$: Actions,
    private baseHttp: BaseHttpService,
    private actionsSubject: ActionsSubject,
    assetsSelector: AssetsSelectorService,
  ) {
    assetsSelector.collectionAutoSave$
      .pipe(
        debounceTime(500),
        filter(data => data.length > 0),
      )
      .subscribe(data =>
        actionsSubject.next(new SaveAssetsHttpRequestAction(data)),
      );
  }

  @Effect()
  getAssets$: Observable<Action> = this.actions$
    .ofType(GetAssetsHttpRequestAction.TYPE)
    .pipe(
      mergeMap((action: GetAssetsHttpRequestAction) =>
        this.baseHttp.getData('assets').pipe(
          map((res: Response) => new GetAssetsHttpResponseAction(res.json())),
          catchError(() => of(new GetAssetsHttpErrorAction())),
        ),
      ),
    );

  @Effect()
  saveAssets$: Observable<Action> = this.actions$
    .ofType(SaveAssetsHttpRequestAction.TYPE)
    .pipe(
      mergeMap((action: SaveAssetsHttpRequestAction) =>
        this.baseHttp.postData('assets/', action.payload).pipe(
          map((res: Response) => new SaveAssetsHttpResponseAction(res.json())),
          catchError(() => of(new SaveAssetsHttpErrorAction())),
        ),
      ),
    );
}
