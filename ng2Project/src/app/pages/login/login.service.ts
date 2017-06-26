/**
 * Created by th3ee on 6/5/17.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class LoginService {
  private url = 'http://59.110.52.133:3333/authenticate';
  private headers = new Headers({'Content-Type': 'application/json'});
  private emailheaders = new Headers({'Content-Type': 'application/json'});
  isLoggedIn: boolean = false;
  userLevel: string;
  constructor(private http: Http) {
  }

  private handleError(error: any): Promise <any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error); // ?
  }

  authenticate(values: Object): Promise <any> {
    return this.http.post(this.url, values, { headers: this.emailheaders }).toPromise().then((res) => {
      console.log(res.json());
      this.isLoggedIn = true;
      this.userLevel = res.json().userlevel;
      console.log(this.userLevel);
      return res.json();
    },
    );
  }

  getuser(): Promise <any> {
    return this.http.get('http://59.110.52.133:3333/getusers').toPromise().then((res) => res.json() as any);
  }
}
