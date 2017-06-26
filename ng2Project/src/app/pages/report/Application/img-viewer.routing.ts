/**
 * Created by xiaoyu on 17-6-5.
 */
import { Routes, RouterModule, Params } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ImgViewerComponent } from './img-viewer.component';
import { ApplyComponent } from './apply-detail/apply.component';
import { AddHeroComponent } from './apply-diagnosis/hero-add.component';
import { ImageDetailComponent } from './apply-image/image-detail.component';
const routes: Routes = [
  {
    path: '',
    component: ImgViewerComponent,
    children: [
      { path: 'applyDetail/:id', component: ApplyComponent },
      { path: 'diagnosisReport/:id', component: AddHeroComponent },
      { path: 'imageDetail', component: ImageDetailComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
