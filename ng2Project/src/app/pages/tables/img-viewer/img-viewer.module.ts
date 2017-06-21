import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTabsModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { NgaModule } from '../../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import {MdSelectModule, MdSliderModule} from '@angular/material';
import { SharedModule } from '../../../shared/_module';
// import { SplitModule } from './splitter/split.module';
import { SidebarModule } from 'ng-sidebar';
import { AngularSplitModule} from './spilt-layout/angularSplit.module';
import { Ng2DragDropModule } from 'ng2-drag-drop';

// import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';

import { ImgViewerComponent } from './img-viewer.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageReportComponent } from './image-report/image-report.component';
import { SendApplyComponent } from './sendapp/sendapp.component';
// import { contentSlider, printSlide, slideAjaxDiv } from './../components/image-slider/index';
// import { VirtualScrollModule } from 'angular2-virtual-scroll';
// import { PolymerModule } from '@codebakery/origami';
import { IronElementsModule, PaperElementsModule } from '@codebakery/origami/lib/collections';

import { CornerstoneElementDirective } from './image-detail/cornerstone-element.directive';

import { HeroService } from './sendapp/hero.service';
import { UserService } from './sendapp/user.service';

import { routing } from './img-viewer.routing';
import { SplitViewComponent } from './image-detail/split-view/split-view.component';
import { SingleViewComponent } from './image-detail/single-view/single-view.component';


@NgModule({
  imports: [
    CommonModule,
    routing,
    MdTabsModule,
    TreeModule,
    NgaModule,
    FormsModule,
    MdSelectModule,
    // VirtualScrollModule,
    SharedModule,
    // SplitModule,
    SidebarModule.forRoot(),
    // SplitPaneModule,
    AngularSplitModule,
    // PolymerModule.forRoot(),
    IronElementsModule,
    PaperElementsModule,
    Ng2DragDropModule,
    MdSliderModule,
  ],
  declarations: [
    ImgViewerComponent,
    ImageDetailComponent,
    ImageReportComponent,
    SendApplyComponent,
    CornerstoneElementDirective,
    SplitViewComponent,
    SingleViewComponent,

    // SplitComponent,
    // contentSlider,
    // printSlide,
    // slideAjaxDiv,
  ],
  providers: [
    HeroService,
    UserService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImgViewerModule { }
