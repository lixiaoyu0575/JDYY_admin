/**
 * Created by th3ee on 6/27/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTabsModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { NgaModule } from '../../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import { MdSelectModule } from '@angular/material';

import { TableReportComponent } from './table-report.component';
import { ApplicationDetailComponent } from'./application-detail/application-detail.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportRecordComponent } from './report-record/report-record.component';

import { HeroService } from '../../report/components/List/hero.service';
import { LoginService } from '../../login/login.service';
import { routing } from './table-report.routing';


@NgModule({
  imports: [
    CommonModule,
    routing,
    MdTabsModule,
    TreeModule,
    NgaModule,
    FormsModule,
    MdSelectModule,
  ],
  declarations: [
    TableReportComponent,
    ApplicationDetailComponent,
    ReportDetailComponent,
    ReportRecordComponent,
  ],
  providers: [
    HeroService,
    LoginService,
  ],
})

export class TableReportModule {}
