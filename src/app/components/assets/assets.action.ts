import { Action } from '@ngrx/store';
import { IAssetItem } from './assets.model';

export class GetAssetsHttpRequestAction implements Action {
  static TYPE = 'http/get-assets/request';
  readonly type = GetAssetsHttpRequestAction.TYPE;
  constructor() {}
}

export class GetAssetsHttpResponseAction implements Action {
  static TYPE = 'http/get-assets/response';
  readonly type = GetAssetsHttpResponseAction.TYPE;
  constructor(public payload: IAssetItem[]) {}
}

export class GetAssetsHttpErrorAction implements Action {
  static TYPE = 'http/get-assets/error';
  readonly type = GetAssetsHttpErrorAction.TYPE;
  constructor() {}
}
export class SaveAssetsHttpRequestAction implements Action {
  static TYPE = 'http/save-assets/request';
  readonly type = SaveAssetsHttpRequestAction.TYPE;
  constructor(public payload: IAssetItem[]) {}
}

export class SaveAssetsHttpResponseAction implements Action {
  static TYPE = 'http/save-assets/response';
  readonly type = SaveAssetsHttpResponseAction.TYPE;
  constructor(public payload: IAssetItem[]) {}
}

export class SaveAssetsHttpErrorAction implements Action {
  static TYPE = 'http/save-assets/error';
  readonly type = SaveAssetsHttpErrorAction.TYPE;
  constructor() {}
}
