import { IProfile } from './profile.model';
import { Action } from '@ngrx/store';

export class GetProfileHttpRequestAction implements Action {
  static TYPE = 'http/get-profile/request';
  readonly type = GetProfileHttpRequestAction.TYPE;
  constructor() {}
}

export class GetProfileHttpResponseAction implements Action {
  static TYPE = 'http/get-profile/response';
  readonly type = GetProfileHttpResponseAction.TYPE;
  constructor(public payload: IProfile) {}
}

export class GetProfileHttpErrorAction implements Action {
  static TYPE = 'http/get-profile/error';
  readonly type = GetProfileHttpErrorAction.TYPE;
  constructor() {}
}
