import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Http } from '@angular/http';
import {
  ProfileHttpGetRequestAction,
  ProfileHttpGetReceiveAction,
  ProfileHttpGetErrorAction,
} from './profile.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { IProfile } from './profile.model';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfileEffect {
  constructor(private http: Http, private actions$: Actions) {}

  @Effect()
  getProfile = this.actions$.ofType(ProfileHttpGetRequestAction.TYPE).pipe(
    mergeMap(action =>
      this.http.get('http://localhost:4000/api/profile').pipe(
        // map((response: IProfile) => new ProfileHttpGetReceiveAction(response)),
        catchError(() => of(new ProfileHttpGetErrorAction())),
      ),
    ),
  );
}
