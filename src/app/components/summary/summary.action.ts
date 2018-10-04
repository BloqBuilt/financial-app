import { ISummary } from './summary.model';
import { Action } from '@ngrx/store';

export class GetSummaryHttpRequestAction implements Action {
  static TYPE = 'http/get-summary/request';
  readonly type = GetSummaryHttpRequestAction.TYPE;
  constructor() {}
}

export class GetSummaryHttpReceiveAction implements Action {
  static TYPE = 'http/get-summary/receive';
  readonly type = GetSummaryHttpReceiveAction.TYPE;
  constructor(public payload: ISummary) {}
}

export class GetSummaryHttpErrorAction implements Action {
  static TYPE = 'http/get-summary/error';
  readonly type = GetSummaryHttpErrorAction.TYPE;
  constructor() {}
}
