import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'report', loadChildren: './report/report.module#ReportModule' },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule',
        data: {
          breadcrumb: 'Tables',
        },
      },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
