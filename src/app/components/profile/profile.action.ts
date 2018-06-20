import { IProfile } from './profile.model';

export class ProfileHttpGetRequestAction {
  static TYPE = 'http/get/profile/request';
  readonly type = ProfileHttpGetRequestAction.TYPE;
}

export class ProfileHttpGetReceiveAction {
  static TYPE = 'http/get/profile/receive';
  readonly type = ProfileHttpGetReceiveAction.TYPE;
  constructor(public profile: IProfile) {}
}

export class ProfileHttpGetErrorAction {
  static TYPE = 'http/get/profile/error';
  readonly type = ProfileHttpGetErrorAction.TYPE;
}
