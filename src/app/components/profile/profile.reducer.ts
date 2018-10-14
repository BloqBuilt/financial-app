import { combineReducers } from '@ngrx/store';
import {
  createFormGroupState,
  createFormGroupReducerWithUpdate,
  validate,
  AbstractControlState,
  FormGroupState,
  disable,
  setValue,
  enable,
} from 'ngrx-forms';
import { required, lessThan, greaterThan } from 'ngrx-forms/validation';
import { IProfile } from './profile.model';
import { GetProfileHttpResponseAction } from './profile.action';

const FORM_ID = 'profile';

export const INITIAL_STATE = createFormGroupState<IProfile>(FORM_ID, {
  name: null,
  age: null,
  retirementAge: null,
  lifeExpectancy: null,
});

const validationFormGroupReducer = createFormGroupReducerWithUpdate<IProfile>({
  name: validate<string>(required),
  age: validate<number>([required, greaterThan(0), lessThan(120)]),
  retirementAge: (
    retirementAge: AbstractControlState<number>,
    rootForm: FormGroupState<IProfile>,
  ) => {
    if (rootForm.value.lifeExpectancy < 10) {
      return disable(setValue(20, retirementAge));
    } else {
      return enable(
        validate<number>([required, greaterThan(0), lessThan(120)])(
          retirementAge,
        ),
      );
    }
  },
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
    formState(s = INITIAL_STATE, a: GetProfileHttpResponseAction) {
      switch (a.type) {
        case GetProfileHttpResponseAction.TYPE:
          return createFormGroupState<IProfile>(FORM_ID, {
            name: a.payload.name,
            age: a.payload.age,
            retirementAge: a.payload.retirementAge,
            lifeExpectancy: a.payload.lifeExpectancy,
          });
      }
      return validationFormGroupReducer(s, a);
    },
  })(_s, _a);
}
