import { StoreModule } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { EffectsModule } from '@ngrx/effects/src/effects_module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

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
    StoreModule.forRoot(
      {
        rootState: (s, a) => {
          return null;
        },
      },
      { metaReducers },
    ),
    EffectsModule.forRoot([]),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 5,
        })
      : [],
  ];
}
