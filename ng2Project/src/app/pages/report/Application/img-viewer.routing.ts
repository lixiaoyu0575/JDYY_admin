/**
 * Created by xiaoyu on 17-6-5.
 */
import { Routes, RouterModule, Params } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ImgViewerComponent } from './img-viewer.component';
import { ApplyComponent } from './apply-detail/apply.component';
import { AddHeroComponent } from './apply-diagnosis/hero-add.component';

const routes: Routes = [
  {
    path: '',
    component: ImgViewerComponent,
    children: [
      { path: 'applyDetail/:name', component: ApplyComponent },
      { path: 'diagnosisReport/:name', component: AddHeroComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
