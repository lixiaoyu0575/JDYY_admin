/**
 * Created by th3ee on 6/20/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'angular-tree-component';
import { MdTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgaModule } from '../../theme/nga.module';
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from './components/doctors/data-filter.pipe';
/*import { IdFilterPipe, NameFilterPipe, AgeFilterPipe, ExamContentFilterPipe, TimeFilterPipe, StatusFilterPipe }
  from '../report/components/List/image-table-filter.pipe';*/
import { HeroService } from '../report/components/List/hero.service';
import { SettingsComponent } from './settings.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { routing } from './settings.routing';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../login/login.service';
import { DocDetailComponent } from './components/doc-detail/doc-detail.component';
@NgModule({
  imports: [CommonModule, FormsModule , routing, HttpModule, NgbDropdownModule, DataTableModule, NgaModule,
    NgbModalModule, MdTabsModule,
    TreeModule],
  declarations: [
    SettingsComponent,
    DoctorsComponent,
    DataFilterPipe,
    DocDetailComponent,
/*    IdFilterPipe,
    NameFilterPipe,
    ExamContentFilterPipe,
    TimeFilterPipe,
    StatusFilterPipe,
    AgeFilterPipe*/],
  providers:    [ HeroService , LoginService],
  bootstrap:    [ SettingsComponent ],
})


export class SettingsModule { }
