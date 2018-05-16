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
  name: null,
  age: null,
  retirementAge: null,
  lifeExpectancy: null,
});

const validationFormGroupReducer = createFormGroupReducerWithUpdate<IProfile>({
  name: validate<string>(required),
  age: (
    age: AbstractControlState<number>,
    rootForm: FormGroupState<IProfile>,
  ) =>
    validate<number>(
      [
        required,
        greaterThan(0),
        lessThan(120),
        maxAge(rootForm.controls.retirementAge.value || null),
      ],
      age,
    ),
  retirementAge: (
    retirementAge: AbstractControlState<number>,
    rootForm: FormGroupState<IProfile>,
  ) =>
    validate<number>(
      [
        required,
        greaterThan(0),
        lessThan(120),
        maxAge(rootForm.controls.lifeExpectancy.value || null),
      ],
      retirementAge,
    ),
  lifeExpectancy: validate<number>([required, greaterThan(0), lessThan(120)]),
});

export function maxAge(maxAge: number) {
  return (value: number) => {
    return value <= maxAge
      ? null
      : {
          maxAge: {
            errorMessage: 'This is too big',
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
