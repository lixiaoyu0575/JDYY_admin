/**
 * Created by th3ee on 5/19/17.
 */
import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from './hero.service';
import { Router , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero , User } from './hero';
import { LocalDataSource } from 'ng2-smart-table';
import { LoginService } from '../../../login/login.service';

import { MdSnackBar } from '@angular/material';

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
  currentUrl = 'http://59.110.52.133:8084';
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
              private loginService: LoginService,
              private location: Location,
              private snackBar: MdSnackBar
  ) {}
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  getUser(): void {
    this.loginService.getuser().then((data) => {
      // this.source.load(data);
      // console.log(data);
      this.users = data;
      this.nowuser = localStorage['user_name'];
      // console.log(this.users);
      this.applyTo = data[1].name;
    });
  }
  ngOnInit(): void {
    this.getHeroes();
    this.getUser();
  }
  gotoHeroes(): void {
    this.router.navigate(['../../../report/list'], { relativeTo: this.route } ); // !
  }
  goBack(): void {
    this.location.back(); // !
  }
  add(name: string, age: string, scantype: string ,
      reason: string, originaldiagnosis: string, status: string, time: string , user: any[]): void {
    const date = new Date();
    name = name.trim();
    age = age.trim();
    scantype = scantype.trim();
    reason = reason.trim();
    originaldiagnosis = originaldiagnosis.trim();
    status = '未审核';
    time = date.toDateString();
    user = [this.applyTo];
    if (!name) {
      return;
    }
    this.heroService.create(name, age, scantype , reason, originaldiagnosis, status, time , user).then( hero => {
      console.log(hero);
      this.heroes.push(hero);
      this.selectedHero = null;
    });
    this.snackBar.open('发送成功', '', {
      duration: 2000,
    });
  }
  sendMail() {
    if (this.applyTo === 'Billy') {
      this.emailContent.recipients = 'th3eepop@163.com';
    } else if (this.applyTo === 'Jishang') {
      this.emailContent.recipients = 'jishang@gmail.com';
    }
    this.emailContent.message = '' + this.nowuser.name + '发来了报告诊断申请,点击' + this.currentUrl + '查看';
    console.log(this.emailContent);
    this.heroService.sendMail(this.emailContent);
  }
}
