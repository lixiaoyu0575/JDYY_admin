/**
 * Created by th3ee on 5/17/17.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Hero, Usercreds } from './hero';
@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private emailUrl = 'http://localhost:3333/sendmail';
  private headers = new Headers({'Content-Type': 'application/json'});
  private emailheaders = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http: Http) {
  }

  getHeroes(): Promise<Hero[]> { // return an array of Hero[] data type
    return this.http.get(this.heroesUrl).toPromise().then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error); // ?
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url).toPromise().then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string, age: string, status: number, user: string[]): Promise<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({
      name: name,
      age: age,
      status: status,
      user: user,
    }), {headers: this.headers})
      .toPromise()
      .then((res) => res.json().data)
      .catch(this.handleError);
  }

  sendMail(usercreds: Usercreds) {
    let emailid = 'name=' + usercreds.recipients + '&text=' + usercreds.message + '&title=' + usercreds.subject;
    console.log(emailid);
    return this.http.post(this.emailUrl, usercreds, { headers: this.emailheaders }).subscribe((data) => {
      if (data.json().success) {
        console.log('Sent successfully');
      }
    });
  }


}


