/**
 * Created by th3ee on 5/17/17.
 */
import { Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero, Usercreds } from './hero';
import { DiagnosisReport } from '../../Application/apply-diagnosis/hero-add';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private localUrl = 'http://202.117.54.45:3333/';
  private emailUrl = 'http://localhost:3333/sendmail';
  private headers = new Headers({'Content-Type': 'application/json'});
  private emailheaders = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getTime(): string {
      // 格式化日期，获取今天的日期
      const dates = new Date();
      const year: number = dates.getFullYear();
      const month: any = ( dates.getMonth() + 1 ) < 10 ? '0' + ( dates.getMonth() + 1 ) : ( dates.getMonth() + 1 );
      const day: any = dates.getDate() < 10 ? '0' + dates.getDate() : dates.getDate();
      const time = year + '-' + month + '-' + day;
      return time;
  }

  getHeroes(): Promise<Hero[]> { // return an array of Hero[] data type
    return this.http.get(this.localUrl + 'gethero')
      .toPromise().then(response => response.json() as Hero[]);
  }

  getHeroesByTime(interval: any): Promise<Hero[]> { // return an array of Hero[] data type
    return this.http.post(this.localUrl + 'getherobytime', JSON.stringify(interval), { headers: this.headers })
      .toPromise().then(response => response.json() as Hero[]);
  }

  getItemsByTime(interval: any): Promise<any> {
    console.log(interval); // return an array of Hero[] data type
    return this.http.post(this.localUrl + 'getitembytime', JSON.stringify(interval), { headers: this.headers })
      .toPromise().then(response => response.json());
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

  getHero(eid: string): Promise<Hero> {
    console.log(eid);
    return this.http.post(this.localUrl + 'getherodetail', JSON.stringify({
      examID: eid,
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

  getReportDetail(eid: string): Promise<DiagnosisReport> {
    console.log(eid);
    return this.http.post(this.localUrl + 'getreport', JSON.stringify({
      examID: eid,
    }), { headers: this.headers })
      .toPromise().then(response => {
        console.log(response.json());
        return response.json();
      })
      .catch(this.handleError);
  }

  updateReport(report: any): Promise<any> {
    return this.http.post(this.localUrl + 'updatereport', JSON.stringify(report), { headers: this.headers })
      .toPromise()
      .then((res) => res.json().data)
      .catch(this.handleError);
  }

  updateApplyItem(examID: string, applystatus: string): Promise<any> {
    return this.http.post(this.localUrl + 'updateapplyitem', JSON.stringify({
      examID: examID,
      applystatus: applystatus,
    }), { headers: this.headers })
      .toPromise()
      .then((res) => res.json().data)
      .catch(this.handleError);
  }

  updateReportItem(examID: string, status: string): Promise<any> {
    return this.http.post(this.localUrl + 'updatereportitem', JSON.stringify({
      examID: examID,
      status: status,
    }), { headers: this.headers })
      .toPromise()
      .then((res) => res.json().data)
      .catch(this.handleError);
  }

  addReportRecord(record: any): Promise<any> {
    console.log(record);
    return this.http.post(this.localUrl + 'addreportrecord', JSON.stringify(record), { headers: this.headers })
      .toPromise()
      .then((res) => res.json().data)
      .catch(this.handleError);
  }

  getReportRecord(eid: string): Promise<any> {
    return this.http.post(this.localUrl + 'getrecord', JSON.stringify({
      examID: eid,
    }), { headers: this.headers })
      .toPromise()
      .then((res) => {
      console.log(res.json());
      return res.json();
      })
      .catch(this.handleError);
  }

  create( pid: string, eid: string , name: string, gender: string,
          age: string, examContent: string , examPart: string , reason: string,
         originaldiagnosis: string, status: string, time: string, applytime: string,
         user: string[]): Promise<any> {
    return this.http.post(this.localUrl + 'addhero', JSON.stringify({
      patientID: pid,
      examID: eid,
      name: name,
      gender: gender,
      age: age,
      examContent: examContent,
      examPart: examPart,
      reason: reason,
      originaldiagnosis: originaldiagnosis,
      status: status,
      time: time,
      applytime: applytime,
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

  getItemByEid(ID: string): Promise <any> {
    return this.http.post(this.localUrl + 'getitembyEid', JSON.stringify({ 'examID': ID }), { headers: this.headers })
      .toPromise()
      .then((res) => res.json())
      .catch(this.handleError);
  }


}


