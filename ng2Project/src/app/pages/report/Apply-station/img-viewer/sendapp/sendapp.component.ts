/**
 * Created by th3ee on 5/19/17.
 */
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../../components/List/hero.service';
import { Router , ActivatedRoute , Params } from '@angular/router';
import { Location } from '@angular/common';
import { Hero , User } from '../../../components/List/hero';
import { LocalDataSource } from 'ng2-smart-table';
import { LoginService } from '../../../../login/login.service';

@Component({
  moduleId: module.id,
  selector: 'send-apply',
  templateUrl: './sendapp.component.html',
})

export class SendApplyComponent implements OnInit {
  item;
  heroes: Hero[];
  selectedHero: Hero;
  users: User[];
  nowuser: User;
  currentUrl = 'http://localhost:4200';
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
              private location: Location) {}

  getUser(): void {
    this.loginService.getuser().then((data) => {
      this.users = data;
      this.nowuser = localStorage['user_name'];
      this.applyTo = data[1].name;
    });
  }
  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.heroService.getItemByEid(params['examID']))
      .subscribe(item => {
        this.item = item;
        console.log(this.item);
      });
    this.getUser();
  }
  gotoHeroes(): void {
    this.router.navigate(['../../../../list'], { relativeTo: this.route } ); // !
  }
  goBack(): void {
    this.location.back(); // !
  }
  add(reason: string, originaldiagnosis: string, time: string , user: any[]): void {
    let pid = this.item.patientID;
    let eid = this.item.examID;
    let name = this.item.name;
    let gender = this.item.gender;
    let age = this.item.age;
    let examContent = this.item.examContent;
    let examPart = this.item.examPart;
    reason = reason.trim();
    originaldiagnosis = originaldiagnosis.trim();
    status = '已发送申请，待填写报告';
    time = this.item.time;
    let applytime = this.heroService.getTime();
    user = [this.applyTo];
    if (!name) {
      return;
    }
    this.heroService.create(pid, eid, name, gender, age, examContent, examPart ,
      reason, originaldiagnosis, status, time , applytime, user).then( hero => {
      console.log(hero);
      this.selectedHero = null;
    });
    this.item.applystatus = '已申请';
    this.heroService.updateApplyItem(this.item.examID, this.item.applystatus);
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
