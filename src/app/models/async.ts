import { Action } from '@ngrx/store';

export interface AsyncAction extends Action {
  payload: AsyncPayload;
}

export interface AsyncPayload {
  START: string;
  REQUEST: string;
  ERROR: string;
  RECEIVE: string;
}
