import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'angular-tree-component';
import { MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgaModule } from '../../theme/nga.module';
import { DataTableModule } from 'angular2-datatable';
import { IdFilterPipe, NameFilterPipe, AgeFilterPipe, ExamContentFilterPipe, TimeFilterPipe, StatusFilterPipe }
from './components/List/image-table-filter.pipe';
import { ReportComponent } from './report.component';
import { HeroesComponent } from './components/List/heroes.component';
import { ApplyComponent } from './Application/apply-detail/apply.component';
// import { HeroDetailComponent } from './components/Application/apply.component';
import { HeroService } from './components/List/hero.service';
import { ImageService } from './Application/img-viewer.service';
// import { DashboardComponent } from './components/List/dashboard.component';
import { AddHeroComponent } from './Application/apply-diagnosis/hero-add.component';
import { DefaultModal } from './components/default-modal/default-modal.component';
import { routing } from './report.routing';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// import { InMemoryDataService } from './components/List/in-memory-data.service';
import { SendApplyComponent } from './components/sendapp/sendapp.component';
import { LoginService } from '../login/login.service';

import { ImgViewerComponent } from './Application/img-viewer.component';
import { ImgViewerModule } from './Application/img-viewer.module';
@NgModule({
  imports:      [ CommonModule, FormsModule , routing, HttpModule, NgbDropdownModule, DataTableModule, NgaModule,
    NgbModalModule, MdTabsModule,
    TreeModule, ImgViewerModule],
  declarations: [
    ReportComponent,
    HeroesComponent,
    // AddHeroComponent,
    DefaultModal,
    // ApplyComponent,
    // ImgViewerComponent,
    SendApplyComponent,
    IdFilterPipe,
    NameFilterPipe,
    ExamContentFilterPipe,
    TimeFilterPipe,
    StatusFilterPipe,
    AgeFilterPipe],
  providers:    [ HeroService , LoginService, ImageService],
  entryComponents: [DefaultModal],
  bootstrap:    [ ReportComponent ],
})


export class ReportModule { }
