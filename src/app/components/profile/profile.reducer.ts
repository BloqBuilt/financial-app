import { combineReducers, Action } from '@ngrx/store';
import {
  createFormGroupState,
  createFormGroupReducerWithUpdate,
  validate,
  AbstractControlState,
  FormGroupState,
} from 'ngrx-forms';
import { required, lessThan, greaterThan } from 'ngrx-forms/validation';

const FORM_ID = 'profile';

export interface IProfile {
  name: string;
  age: number;
  retirementAge: number;
  lifeExpectancy: number;
}

export const INITIAL_STATE = createFormGroupState<IProfile>(FORM_ID, {
  name: 'Roman',
  age: 30,
  retirementAge: 50,
  lifeExpectancy: 90,
});

const validationFormGroupReducer = createFormGroupReducerWithUpdate<IProfile>({
  name: validate<string>(required),
  age: validate<number>([required, greaterThan(0), lessThan(120)]),
  retirementAge: validate<number>([required, greaterThan(0), lessThan(120)]),
  lifeExpectancy: (
    lifeExpectancy: AbstractControlState<number>,
    rootForm: FormGroupState<IProfile>,
  ) =>
    validate<number>(
      [
        required,
        greaterThan(0),
        lessThan(120),
        minAge(rootForm.controls.retirementAge.value || null),
      ],
      lifeExpectancy,
    ),
});

export function maxAge(maxAgeValue: number) {
  return (value: number) => {
    return value <= maxAgeValue
      ? null
      : {
          maxAge: {
            errorMessage: 'This is too big',
          },
        };
  };
}

export function minAge(minAgeValue: number) {
  return (value: number) => {
    return value >= minAgeValue
      ? null
      : {
          minAge: {
            errorMessage: 'This is too small',
          },
        };
  };
}

export function profileReducer(_s: any, _a: any) {
  return combineReducers<any, any>({
    formState(s = INITIAL_STATE, a: Action) {
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
}
