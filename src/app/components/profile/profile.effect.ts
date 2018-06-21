import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Http, Response } from '@angular/http';
import {
  GetProfileHttpRequestAction,
  GetProfileHttpReceiveAction,
  GetProfileHttpErrorAction,
} from './profile.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BaseHttpService } from '../../api/base-http/base-http.service';

@Injectable()
export class ProfileEffect {
  constructor(private baseHttp: BaseHttpService, private actions$: Actions) {}

  @Effect()
  getProfile = this.actions$.ofType(GetProfileHttpRequestAction.TYPE).pipe(
    mergeMap(action =>
      this.baseHttp.getData('profile').pipe(
        map((res: Response) => new GetProfileHttpReceiveAction(res.json())),
        catchError(() => of(new GetProfileHttpErrorAction())),
      ),
    ),
  );
}
