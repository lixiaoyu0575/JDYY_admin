/**
 * Created by th3ee on 6/27/17.
 */
/**
 * Created by xiaoyu on 17-6-5.
 */
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TableReportComponent } from './table-report.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportRecordComponent } from './report-record/report-record.component';

const routes: Routes = [
  {
    path: '',
    component: TableReportComponent,
    children: [
      { path: 'applyDetail/:examID', component: ApplicationDetailComponent },
      { path: 'reportDetail/:examID', component: ReportDetailComponent },
      { path: 'reportRecord/:examID', component: ReportRecordComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
