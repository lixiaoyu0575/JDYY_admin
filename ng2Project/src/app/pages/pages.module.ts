import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { NotfoundRoutingModule } from './notfound/notfound-routing.module';

@NgModule({
  imports: [CommonModule, AppTranslationModule,
    FormsModule, ReactiveFormsModule, NgaModule, routing, LoginRoutingModule, NotfoundRoutingModule],
  declarations: [Pages, LoginComponent, NotfoundComponent],
  // providers: [LoginService, AuthPage],
})
export class PagesModule {
}
