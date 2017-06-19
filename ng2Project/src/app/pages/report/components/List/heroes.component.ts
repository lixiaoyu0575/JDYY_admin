import { Component, OnInit} from '@angular/core';
import {Hero, User} from './hero';
import { HeroService } from './hero.service';
import { LoginService } from '../../../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../default-modal/default-modal.component';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: './heroes.component.html'
  ,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})
export class HeroesComponent implements OnInit {


  idFilterQuery = '';
  nameFilterQuery = '';
  ageFilterQuery = '';
  examContentFilterQuery = '';
  timeFilterQuery = '';
  statusFilterQuery = '';
  rowsOnPage = 10;
  sortBy = 'email';
  sortOrder = 'asc';


  heroes: Hero[];
  users: User[];
  shareTo: string;
  selecteduser: string;
  nowuser: string;
  title= 'Tour of Heros';
  selectedHero: Hero;
  source: LocalDataSource = new LocalDataSource();
  emailContent = {
    recipients: '',
    subject: '您有一份阅片诊断申请',
    message: '',
  };
  constructor(private router: Router, private route: ActivatedRoute,
              private heroService: HeroService,
              private loginService: LoginService,
              private location: Location,
              private modalService: NgbModal) {}

  getUser(): void {
    this.loginService.getuser().then((data) => {
      // this.source.load(data);
      this.users = data;
      this.nowuser = localStorage['user_name'];
      this.selecteduser = data[0].name;
      this.shareTo = data[1].name;
      this.emailContent.recipients = data[1].email;
    });
  }
  getHeroes(): void {
    this.heroService.getHeroes().then((heroes) => {
      console.log(heroes);
      this.heroes = heroes;
      console.log(this.heroes);
    });
  }
  goBack(): void {
    this.location.back(); // !
  }
  doShare(): void {
        this.selectedHero.user.push(this.shareTo);
        this.heroService.update(this.selectedHero)
      .then(() => {
        alert('发送成功');
        });
      }

  switchUser(): void {
    this.loginService.getuser().then((data) => {
      // this.source.load(data);
      console.log(data);
     for (let i = 0; i < data.length; i++) {
       if (data[i].name === this.selecteduser) {
         this.nowuser = data[i].name;
       }
     }
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    this.router.navigate
    (['../imgViewer' , this.selectedHero.name, 'applyDetail', this.selectedHero.name], { relativeTo: this.route } );

  }

  gotoAdd(): void {
    this.router.navigate(['../sendapply'], { relativeTo: this.route } );
  }

  sendMail() {
    this.emailContent.message = '' + this.nowuser + '发来了报告诊断申请';
    console.log(this.emailContent);
    this.heroService.sendMail(this.emailContent);

  }

}


