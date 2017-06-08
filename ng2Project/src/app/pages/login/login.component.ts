import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
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
       console.log(values);
       this.loginService.authenticate(values).then((res) => {
         if (res.token) {
           console.log(res);
           localStorage.setItem('user_token', res.token);
           localStorage.setItem('user_name', res.username);
           console.log(localStorage['user_name']);
           this.router.navigate(['../pages/report/list'], { relativeTo: this.route } );
           this.loginService.getuser().then((response) => {
             console.log(response);
           });
         }
       });
    }
  }
}
