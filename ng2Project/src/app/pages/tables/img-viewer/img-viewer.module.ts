import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTabsModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { NgaModule } from '../../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import {MdSelectModule} from '@angular/material';

import { ImgViewerComponent } from './img-viewer.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageReportComponent } from './image-report/image-report.component';
import { SendApplyComponent } from './sendapp/sendapp.component';

import { HeroService } from './sendapp/hero.service';
import { LoginService } from '../../login/login.service';
// import { UserService } from './sendapp/user.service';

import { routing } from './img-viewer.routing';


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
    ImgViewerComponent,
    ImageDetailComponent,
    ImageReportComponent,
    SendApplyComponent,
  ],
  providers: [
    HeroService,
    LoginService,
  ],
})
export class ImgViewerModule { }
