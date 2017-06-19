import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;


  constructor(fb: FormBuilder, private loginService: LoginService, private router: Router,
  private route: ActivatedRoute) {

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
       this.loginService.authenticate(values).then((res) => {
         if (this.loginService.isLoggedIn) {
           console.log(this.loginService.isLoggedIn);
           localStorage.setItem('user_token', res.token);
           localStorage.setItem('user_name', res.username);
           if (this.loginService.userLevel === 'II') {
             this.router.navigate(['../pages/report/list'], { relativeTo: this.route } );
           }else {
             this.router.navigate(['../pages/tables/imageTable'], { relativeTo: this.route } );
           }
           this.loginService.getuser().then((response) => {
           });
         }
       });
    }
  }
}
