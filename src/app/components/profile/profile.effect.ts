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

@Injectable()
export class ProfileEffect {
  constructor(private http: Http, private actions$: Actions) {}

  @Effect()
  getProfile = this.actions$.ofType(GetProfileHttpRequestAction.TYPE).pipe(
    mergeMap(action =>
      this.http.get('http://localhost:4000/api/profile').pipe(
        map(
          (response: Response) =>
            new GetProfileHttpReceiveAction(response.json()),
        ),
        catchError(() => of(new GetProfileHttpErrorAction())),
      ),
    ),
  );
}
