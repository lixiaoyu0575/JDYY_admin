import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReportComponent } from './report.component';
import { HeroesComponent } from './components/List/heroes.component';
import { ApplyComponent } from './components/Application/apply.component';
// import { HeroDetailComponent } from './components/Application/apply.component';
import { HeroService } from './components/List/hero.service';
import { UserService } from './components/List/user.service';
import { DashboardComponent } from './components/List/dashboard.component';
import { AddHeroComponent } from './components/List/hero-add.component';
import { DefaultModal } from './components/default-modal/default-modal.component';
import { routing } from './report.routing';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { InMemoryDataService } from './components/List/in-memory-data.service';
import { SendApplyComponent } from './components/sendapp/sendapp.component';



@NgModule({
  imports:      [ CommonModule, FormsModule , routing, HttpModule, NgbDropdownModule,
    NgbModalModule, InMemoryWebApiModule.forRoot(InMemoryDataService)],
  declarations: [ ReportComponent, HeroesComponent, DashboardComponent, AddHeroComponent, DefaultModal, ApplyComponent, SendApplyComponent],
  providers:    [ HeroService , UserService],
  entryComponents: [DefaultModal],
  bootstrap:    [ ReportComponent ],
})


export class ReportModule { }
