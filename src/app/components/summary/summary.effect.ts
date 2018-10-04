import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Response } from '@angular/http';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BaseHttpService } from '../../api/base-http/base-http.service';
import {
  GetSummaryHttpRequestAction,
  GetSummaryHttpResponseAction,
  GetSummaryHttpErrorAction,
} from './summary.action';

@Injectable()
export class SummaryEffect {
  constructor(private baseHttp: BaseHttpService, private actions$: Actions) {}

  @Effect()
  getProfile = this.actions$.ofType(GetSummaryHttpRequestAction.TYPE).pipe(
    mergeMap(() =>
      this.baseHttp.getData('summary').pipe(
        map((res: Response) => new GetSummaryHttpResponseAction(res.json())),
        catchError(() => of(new GetSummaryHttpErrorAction())),
      ),
    ),
  );
}
