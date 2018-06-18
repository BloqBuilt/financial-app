import { StoreModule } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

// Effects
export function logger(reducer: ActionReducer<{}>): any {
  return storeLogger({ collapsed: true })(reducer);
}

export const metaReducers = [
  logger,
  ...(!environment.production ? [storeFreeze] : []),
];

export function initializeStore() {
  return [
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 5,
        })
      : [],
  ];
}
