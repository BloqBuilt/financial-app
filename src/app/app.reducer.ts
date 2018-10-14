import { StoreModule } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';
import { storeLogger } from 'ngrx-store-logger';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { liabilitiesReducer } from './components/liabilities/liabilities.reducer';
import { cashFlowReducer } from './components/cash-flow/cash-flow.reducer';
import { assetsReducer } from './components/assets/assets.reducer';
import { profileReducer } from './components/profile/profile.reducer';
import { summaryReducer } from './components/summary/summary.reducer';

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
        summary: summaryReducer,
        liabilities: liabilitiesReducer,
        cashFlow: cashFlowReducer,
        assets: assetsReducer,
        profile: profileReducer,
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
