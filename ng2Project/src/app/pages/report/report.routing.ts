/**
 * Created by th3ee on 5/23/17.
 */
/**
 * Created by th3ee on 5/18/17.
 */
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { ReportComponent } from './report.component';
import { HeroesComponent } from './components/List/heroes.component';
import { AddHeroComponent } from './Application/apply-diagnosis/hero-add.component';
import { ApplyComponent } from './Application/apply-detail/apply.component';
import { SendApplyComponent } from './components/sendapp/sendapp.component';
import { ImgViewerComponent } from './Application/img-viewer.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      { path: 'list', component: HeroesComponent },
      { path: 'apply/:name', component: ApplyComponent },
      { path: 'diagnose/:name', component: AddHeroComponent },
      { path: 'add', component: AddHeroComponent },
      { path: 'sendapply', component: SendApplyComponent },
      { path: 'imgViewer/:name', loadChildren: './Application/img-viewer.module#ImgViewerModule' },
       // { path: 'imgViewer/apply-detail/:name', component: ApplyComponent },
       // { path: 'imgViewer/apply-diagnosis/:name', component: AddHeroComponent },
       // { path: 'imgViewer', component: ImgViewerComponent },
    ]
  }
];
export const routing = RouterModule.forChild(routes);
