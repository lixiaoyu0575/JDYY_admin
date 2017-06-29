/**
 * Created by yqzheng on 2017/6/20.
 */
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgaModule } from '../../theme/nga.module';
import { DataTableModule } from 'angular2-datatable';
import { MdTabsModule } from '@angular/material';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { HotTable, HotTableModule } from 'ng2-handsontable';

import { routing } from './profile.routing';
import { profile } from './profile.component';
import { HeroService } from '../report/components/List/hero.service';

import { DataTables } from './dataTables/dataTables.component';
import { DataTablesService } from './dataTables/dataTables.service';
import { DataFilterPipe } from './dataTables/data-filter.pipe';
import {Feed} from './feed/feed.component';
import { FeedService } from './feed/feed.service';
import {personalInform} from './personalInform/personalInform.component';
import {personalInformService } from './personalInform/personalInform.service';
import { User } from './user/user.component';
import { userService } from './user/user.service';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    DataTableModule,
    HttpModule,
    HotTableModule,
    MdTabsModule,
    NgbRatingModule
  ],
  declarations: [
    profile,
    DataTables,
    DataFilterPipe,
    Feed,
    personalInform,
    User,
    Calendar
  ],
  providers: [
    DataTablesService,
    FeedService,
    personalInformService,
    userService,
    HeroService,
    CalendarService
  ]
})
export class profileModule {}
