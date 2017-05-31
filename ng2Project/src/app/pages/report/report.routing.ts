/**
 * Created by th3ee on 5/23/17.
 */
/**
 * Created by th3ee on 5/18/17.
 */
import { Routes, RouterModule }  from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportComponent } from './report.component';
import { HeroesComponent } from './components/List/heroes.component';
// import { HeroDetailComponent } from './components/Application/apply.component';
import { AddHeroComponent } from './components/List/hero-add.component';
import { ApplyComponent } from './components/Application/apply.component';
import { SendApplyComponent } from './components/sendapp/sendapp.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      { path: '', component: HeroesComponent },
      { path: 'apply/:id', component: ApplyComponent },
      { path: 'diagnose/:id', component: AddHeroComponent },
      { path: 'add', component: AddHeroComponent },
      { path: 'sendapply', component: SendApplyComponent },
     // { path: 'apply', component: ApplyComponent },
    ]
  }
];
export const routing = RouterModule.forChild(routes);
