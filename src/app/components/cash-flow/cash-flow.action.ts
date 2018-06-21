import { Action } from '@ngrx/store';
import { ICashFlowItem } from './cash-flow.model';

export class SaveCashFlowHttpRequestAction implements Action {
  static TYPE = 'http/save-cash-flow/request';
  readonly type = SaveCashFlowHttpRequestAction.TYPE;
  constructor(public payload: ICashFlowItem[]) {}
}

export class SaveCashFlowHttpResponseAction implements Action {
  static TYPE = 'http/save-cash-flow/response';
  readonly type = SaveCashFlowHttpResponseAction.TYPE;
  constructor(public payload: ICashFlowItem[]) {}
}

export class SaveCashFlowHttpErrorAction implements Action {
  static TYPE = 'http/save-cash-flow/error';
  readonly type = SaveCashFlowHttpErrorAction.TYPE;
  constructor() {}
}
