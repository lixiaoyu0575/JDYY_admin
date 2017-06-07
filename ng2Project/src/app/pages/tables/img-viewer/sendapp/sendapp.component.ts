/**
 * Created by th3ee on 5/19/17.
 */
import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from './hero.service';
import { Router , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './user.service';
import { Hero , User } from './hero';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  moduleId: module.id,
  selector: 'send-apply',
  templateUrl: './sendapp.component.html',
})

export class SendApplyComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  users: User[];
  nowuser: User;
  currentUrl = 'http://localhost:4200/#/pages/report';
  applyTo: string;
  emailContent = {
    recipients: '',
    subject: '您有一份阅片诊断申请',
    message: '',
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,
              private route: ActivatedRoute,
              private heroService: HeroService,
              private userService: UserService,
              private location: Location) {}
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  getUser(): void {
    this.userService.getData().then((data) => {
      this.source.load(data);
      console.log(data);
      this.users = data;
      this.nowuser = data[0];
      console.log(this.users);
      this.applyTo = data[1].name;
    });
  }
  ngOnInit(): void {
    this.getHeroes();
    this.getUser();
  }
  gotoHeroes(): void {
    this.router.navigate(['../'], { relativeTo: this.route } ); // !
  }
  goBack(): void {
    this.location.back(); // !
  }
  add(name: string, age: string, reason: string, originaldiagnosis: string, status: number, user: any[]): void {
    name = name.trim();
    age = age.trim();
    reason = reason.trim();
    originaldiagnosis = originaldiagnosis.trim();
    status = 0;
    user = [this.applyTo];
    if (!name) {
      return;
    }
    this.heroService.create(name, age, reason, originaldiagnosis, status, user).then( hero => {
      console.log(hero);
      this.heroes.push(hero);
      this.selectedHero = null;
    });
  }
  sendMail() {
    this.emailContent.recipients = 'th3eepop@163.com';
    this.emailContent.message = '' + this.nowuser.name + '发来了报告诊断申请,点击' + this.currentUrl + '查看';
    console.log(this.emailContent);
    this.heroService.sendMail(this.emailContent);
  }
}