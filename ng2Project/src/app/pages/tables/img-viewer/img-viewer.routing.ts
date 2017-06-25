/**
 * Created by xiaoyu on 17-6-5.
 */
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ImgViewerComponent } from './img-viewer.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageReportComponent } from './image-report/image-report.component';

const routes: Routes = [
  {
    path: '',
    component: ImgViewerComponent,
    children: [
      { path: 'imageDetail', component: ImageDetailComponent },
      { path: 'applyDetail/:ID', component: ImageReportComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
