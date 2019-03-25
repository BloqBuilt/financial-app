import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/summary',
    pathMatch: 'full',
  },
  {
    path: 'summary',
    loadChildren: './components/summary/summary.module#SummaryModule',
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
  {
    path: 'schedule',
    loadChildren: './components/schedule/schedule.module#ScheduleModule',
  },
];
