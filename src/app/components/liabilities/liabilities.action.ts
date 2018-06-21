import { Action } from '@ngrx/store';
import { LiabilityItem } from './liabilities.model';

export class GetLiabilitiesHttpRequestAction implements Action {
  static TYPE = 'http/get-liabilities/request';
  readonly type = GetLiabilitiesHttpRequestAction.TYPE;
  constructor() {}
}

export class GetLiabilitiesHttpResponseAction implements Action {
  static TYPE = 'http/get-liabilities/response';
  readonly type = GetLiabilitiesHttpResponseAction.TYPE;
  constructor(public payload: LiabilityItem[]) {}
}

export class GetLiabilitiesHttpErrorAction implements Action {
  static TYPE = 'http/get-liabilities/error';
  readonly type = GetLiabilitiesHttpErrorAction.TYPE;
  constructor() {}
}

export class SaveLiabilitiesHttpRequestAction implements Action {
  static TYPE = 'http/save-liabilities/request';
  readonly type = SaveLiabilitiesHttpRequestAction.TYPE;
  constructor(public payload: LiabilityItem[]) {}
}

export class SaveLiabilitiesHttpResponseAction implements Action {
  static TYPE = 'http/save-liabilities/response';
  readonly type = SaveLiabilitiesHttpResponseAction.TYPE;
  constructor(public payload: LiabilityItem[]) {}
}

export class SaveLiabilitiesHttpErrorAction implements Action {
  static TYPE = 'http/save-liabilities/error';
  readonly type = SaveLiabilitiesHttpErrorAction.TYPE;
  constructor() {}
}
