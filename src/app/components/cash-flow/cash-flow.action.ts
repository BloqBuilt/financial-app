import { Action } from '@ngrx/store';
import { CashFlowItem } from './cash-flow.model';

export type CashFlowHttpActions =
  | GetCashFlowHttpRequestAction
  | GetCashFlowHttpResponseAction
  | GetCashFlowHttpErrorAction
  | SaveCashFlowHttpRequestAction
  | SaveCashFlowHttpResponseAction
  | SaveCashFlowHttpErrorAction;

export class GetCashFlowHttpRequestAction implements Action {
  static TYPE = 'http/get-cash-flow/request';
  readonly type = GetCashFlowHttpRequestAction.TYPE;
  constructor() {}
}

export class GetCashFlowHttpResponseAction implements Action {
  static TYPE = 'http/get-cash-flow/response';
  readonly type = GetCashFlowHttpResponseAction.TYPE;
  constructor(public payload: CashFlowItem[]) {}
}

export class GetCashFlowHttpErrorAction implements Action {
  static TYPE = 'http/get-cash-flow/error';
  readonly type = GetCashFlowHttpErrorAction.TYPE;
  constructor() {}
}

export class SaveCashFlowHttpRequestAction implements Action {
  static TYPE = 'http/save-cash-flow/request';
  readonly type = SaveCashFlowHttpRequestAction.TYPE;
  constructor(public payload: CashFlowItem[]) {}
}

export class SaveCashFlowHttpResponseAction implements Action {
  static TYPE = 'http/save-cash-flow/response';
  readonly type = SaveCashFlowHttpResponseAction.TYPE;
  constructor(public payload: CashFlowItem[]) {}
}

export class SaveCashFlowHttpErrorAction implements Action {
  static TYPE = 'http/save-cash-flow/error';
  readonly type = SaveCashFlowHttpErrorAction.TYPE;
  constructor() {}
}
