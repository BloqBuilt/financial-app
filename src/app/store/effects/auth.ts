import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

class PayloadAction implements Action {
  type: string;
  payload: any;

  constructor(type: string, payload: any) {
    this.type = type;
    this.payload = payload;
  }
}

@Injectable()
export class AuthEffects {
  constructor(private http: Http, private actions$: Actions) {}
  // Listen for the 'LOGIN' action
  @Effect()
  login$: Observable<Action> = this.actions$.ofType('LOGIN').pipe(
    mergeMap((action: PayloadAction) =>
      this.http.post('/auth', action.payload).pipe(
        // If successful, dispatch success action with result
        map(data => ({ type: 'LOGIN_SUCCESS', payload: data })),
        // If request fails, dispatch failed action
        catchError(() => of({ type: 'LOGIN_FAILED' })),
      ),
    ),
  );
}
