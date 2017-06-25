import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthPageII } from './login/auth-II.service';
import { AuthPageI } from './login/auth-I.service';
import { NotfoundComponent } from './notfound/notfound.component';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'report', pathMatch: 'full' },
      { path: 'report', loadChildren: './report/report.module#ReportModule' /*, canActivate: [AuthPageII]*/ },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule', /*canActivate: [AuthPageI],*/
        data: {
          breadcrumb: 'Tables',
          },
      },
      { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
