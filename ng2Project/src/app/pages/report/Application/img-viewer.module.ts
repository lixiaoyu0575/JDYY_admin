import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTabsModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { NgaModule } from '../../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import { MdSelectModule } from '@angular/material';

import { ImgViewerComponent } from './img-viewer.component';
import { ApplyComponent } from './apply-detail/apply.component';
import { AddHeroComponent } from './apply-diagnosis/hero-add.component';
import { ImageDetailComponent } from './apply-image/image-detail.component';
import { HeroService } from '../components/List/hero.service';

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
    ApplyComponent,
    AddHeroComponent,
    ImageDetailComponent,
  ],
  providers: [
    HeroService,

  ],
})
export class ImgViewerModule { }
