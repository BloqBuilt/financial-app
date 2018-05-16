import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { AsyncAction } from '../../models/async';

@Injectable()
export class LiabilityEffect {
  constructor(private actions$: Actions) {}

  // Listen for the 'LOGIN' action
  // @Effect() login$: Observable<Action> = this.createEffect();
  // .mergeMap((action: PayloadAction) =>
  //   this.http
  //     .post('/auth', action.payload)
  //     // If successful, dispatch success action with result
  //     .map(data => ({ type: 'LOGIN_SUCCESS', payload: data }))
  //     // If request fails, dispatch failed action
  //     .catch(() => of({ type: 'LOGIN_FAILED' })),
  // );

  // createEffect = (action: Async) => this.actions$.ofType(action.type.START);
}
