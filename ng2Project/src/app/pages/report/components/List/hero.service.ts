/**
 * Created by th3ee on 5/17/17.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero, Usercreds } from './hero';
import { DiagnosisReport } from '../../Application/apply-diagnosis/hero-add';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private localUrl = 'http://59.110.52.133:3333/';
  private emailUrl = 'http://59.110.52.133:3333/sendmail';
  private headers = new Headers({'Content-Type': 'application/json'});
  private emailheaders = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getHeroes(): Promise<Hero[]> { // return an array of Hero[] data type
    return this.http.get(this.localUrl + 'gethero')
      .toPromise().then(response => response.json() as Hero[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error); // ?
  }

  deleteHero(name: string): Promise<any> {
    return this.http.post(this.localUrl + 'deletehero', JSON.stringify({
      name: name,
    }), { headers: this.headers })
      .toPromise().then((res) => res.json())
      .catch(this.handleError);
  }

  getHero(id: string): Promise<Hero> {
    return this.http.post(this.localUrl + 'getherodetail', JSON.stringify({
      id: id,
    }), { headers: this.headers })
      .toPromise().then(response => {
        console.log(response.json());
       return response.json();
      })
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    return this.http.post(this.localUrl + 'updatehero', JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }


  createReport(report: DiagnosisReport): Promise<DiagnosisReport> {
    return this.http.post(this.localUrl + 'addreport', JSON.stringify(report), { headers: this.headers })
      .toPromise()
      .then((res) => res.json().data)
      .catch(this.handleError);
  }

  getReport(): Promise<DiagnosisReport[]> {
    return this.http.get(this.localUrl + 'getallreport')
      .toPromise()
      .then((res) => {
      console.log(res.json());
       return res.json();
      })
      .catch(this.handleError);
  }

  create( id: string, name: string, age: string, scantype: string , reason: string,
         originaldiagnosis: string, status: string, time: string,
         user: string[]): Promise<any> {
    return this.http.post(this.localUrl + 'addhero', JSON.stringify({
      id: id,
      name: name,
      age: age,
      scantype: scantype,
      reason: reason,
      originaldiagnosis: originaldiagnosis,
      status: status,
      time: time,
      user: user,
    }), { headers: this.headers })
      .toPromise()
      .then((res) => res.json().data)
      .catch(this.handleError);
  }

  sendMail(usercreds: Usercreds) {
    let emailid = 'name=' + usercreds.recipients + '&text=' + usercreds.message + '&title=' + usercreds.subject;
    console.log(emailid);
    this.http.post(this.localUrl + 'sendmail', usercreds, { headers: this.emailheaders }).toPromise()
      .then((res) => {
      res.json();
      console.log(res.status);
      });
  }

  getAllItems(): Promise<any> {
    return this.http.get(this.localUrl + 'getallitems')
      .toPromise()
      .then((res) => res.json())
      .catch(this.handleError);
  }

  getItem(ID: string): Promise <any> {
    return this.http.post(this.localUrl + 'getitem', JSON.stringify({ ID: ID }), { headers: this.headers })
      .toPromise()
      .then((res) => res.json())
      .catch(this.handleError);
  }
}


