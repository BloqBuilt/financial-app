import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadChildren: './components/profile/profile.module#ProfileModule',
  },
  {
    path: 'cash-flow',
    loadChildren: './components/cash-flow/cash-flow.module#CashFlowModule',
  },
  {
    path: 'assets',
    loadChildren: './components/assets/assets.module#AssetsModule',
  },
  {
    path: 'liabilities',
    loadChildren:
      './components/liabilities/liabilities.module#LiabilitiesModule',
  },
];
