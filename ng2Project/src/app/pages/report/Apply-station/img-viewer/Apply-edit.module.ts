import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTabsModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { NgaModule } from '../../../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import { MdSelectModule } from '@angular/material';

import { ApplyEditComponent } from './Apply-edit.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageReportComponent } from './image-report/image-report.component';
import { SendApplyComponent } from './sendapp/sendapp.component';

import { HeroService } from '../../components/List/hero.service';
import { LoginService } from '../../../login/login.service';
import { ImageService } from './Apply-edit.service';
// import { UserService } from './sendapp/user.service';

import { routing } from './Apply-edit.routing';


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
    ApplyEditComponent,
    ImageDetailComponent,
    ImageReportComponent,
    SendApplyComponent,
  ],
  providers: [
    HeroService,
    LoginService,
    ImageService,
  ],
})
export class ApplyEditModule { }
