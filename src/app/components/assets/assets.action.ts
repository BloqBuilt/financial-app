import { Action } from '@ngrx/store';
import { IAssetItem } from './assets.model';

export class SaveAssetHttpRequestAction implements Action {
  static TYPE = 'http/save-asset/request';
  readonly type = SaveAssetHttpRequestAction.TYPE;
  constructor(public payload: IAssetItem[]) {}
}

export class SaveAssetHttpResponseAction implements Action {
  static TYPE = 'http/save-asset/response';
  readonly type = SaveAssetHttpResponseAction.TYPE;
  constructor(public payload: IAssetItem[]) {}
}

export class SaveAssetHttpErrorAction implements Action {
  static TYPE = 'http/save-asset/error';
  readonly type = SaveAssetHttpErrorAction.TYPE;
}
