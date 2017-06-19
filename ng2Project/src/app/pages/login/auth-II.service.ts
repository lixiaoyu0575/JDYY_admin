/**
 * Created by th3ee on 6/13/17.
 */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthPageII implements CanActivate {
  constructor (private loginService: LoginService, private router: Router, private route: ActivatedRoute) {
  }

  canActivate() {
    console.log('AuthGuard#canActivate called');
    console.log(this.checkLogin());
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.loginService.isLoggedIn && this.loginService.userLevel === 'II') {
      return true;
    } else {
      this.router.navigate(['../../login'], { relativeTo: this.route } );
      console.log('false');
      return false;
    }
  }
}
