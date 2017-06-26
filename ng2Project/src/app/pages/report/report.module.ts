import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'angular-tree-component';
import { MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgaModule } from '../../theme/nga.module';
import { DataTableModule } from 'angular2-datatable';
import { IdFilterPipe, NameFilterPipe, AgeFilterPipe, ScanTypeFilterPipe, TimeFilterPipe, StatusFilterPipe }
from './components/List/list-table-filter.pipe';
import { ReportComponent } from './report.component';
import { HeroesComponent } from './components/List/heroes.component';
import { HeroService } from './components/List/hero.service';
import { ImageService } from './Application/img-viewer.service';
import { DefaultModal } from './components/default-modal/default-modal.component';
import { routing } from './report.routing';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';
import { ImgViewerModule } from './Application/img-viewer.module';
import { ReportListComponent } from './components/report-list/report-list.component';
import { ReportDetailComponent } from './components/report-list/report-detail/report-detail.component';
import { ApplicationDetailComponent } from './components/report-list/application-detail/application-detail.component';
@NgModule({
  imports: [CommonModule, FormsModule , routing, HttpModule, NgbDropdownModule, DataTableModule, NgaModule,
    NgbModalModule, MdTabsModule,
    TreeModule, ImgViewerModule],
  declarations: [
    ReportComponent,
    HeroesComponent,
    DefaultModal,
    IdFilterPipe,
    NameFilterPipe,
    ScanTypeFilterPipe,
    TimeFilterPipe,
    StatusFilterPipe,
    AgeFilterPipe,
    ReportListComponent,
    ReportDetailComponent,
    ApplicationDetailComponent],
  providers:    [ HeroService , LoginService, ImageService],
  entryComponents: [DefaultModal],
  bootstrap:    [ ReportComponent ],
})


export class ReportModule { }
