/**
 * Created by th3ee on 6/16/17.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageII } from './auth-II.service';
import { AuthPageI } from './auth-I.service';
import { LoginService } from './login.service';
import { LoginComponent } from './login.component';
const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AuthPageII,
    AuthPageI,
    LoginService,
  ]
})
export class LoginRoutingModule {}
