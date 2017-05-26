import { Component, OnInit} from '@angular/core';
import {Hero, User} from './hero';
import { HeroService } from './hero.service';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from '../default-modal/default-modal.component';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: './heroes.component.html'
  // Angular insists that we declare a target property to be an input property.
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

  heroes: Hero[];
  users: User[];
  shareTo: string;
  selecteduser: string;
  nowuser: User;
  title= 'Tour of Heros';
  selectedHero: Hero;
  source: LocalDataSource = new LocalDataSource();
  emailContent = {
    recipients: '',
    subject: '诊断报告共享',
    message: '',
  };
  constructor(private router: Router, private route: ActivatedRoute,
              private heroService: HeroService, private userService: UserService,
              private location: Location,
              private modalService: NgbModal) {}

  getUser(): void {
    this.userService.getData().then((data) => {
      this.source.load(data);
      console.log(data);
      this.users = data;
      console.log(this.users);
      this.nowuser = data[0];
      this.selecteduser = data[0].name;
      this.shareTo = data[1].name;
      this.emailContent.recipients = data[1].email;
      console.log(this.source);
      console.log(this.nowuser.email);
      console.log(this.nowuser.name);
    });
  }
  getHeroes(): void {
    this.heroService.getHeroes().then((heroes) => {
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


  /*showModal(): void {
    const activeModal = this.modalService.open(DefaultModal, {size: 'lg'});
    activeModal.componentInstance.modalHeader = '提交报告';
  }*/

  switchUser(): void {
    this.userService.getData().then((data) => {
      this.source.load(data);
      console.log(data);
     for (let i = 0; i < data.length; i++) {
       if (data[i].name === this.selecteduser) {
         this.nowuser = data[i];
       }
     }
    });
  };

  ngOnInit(): void {
    this.getUser();
    this.getHeroes();
  }
  onSelect(hero: Hero): void {
    // console.log(this.router);
    this.selectedHero = hero;
    // console.log(this.selectedHero.id);
  }
  gotoDetail(): void {
    this.router.navigate(['../detail', this.selectedHero.id], { relativeTo: this.route } );
  }

  gotoAdd(): void {
    // console.log("hety");
    this.router.navigate(['../add'], { relativeTo: this.route } );
    // this.router.navigateByUrl('localhost:4200/#/detail/12');
    // console.log(this.selectedHero.id);
    // console.log("hety");
  }

  add(name: string, age: string, status: number): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name, age, status).then( hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    });
  }

  sendMail() {
    this.emailContent.message = '您有一份来自' + this.nowuser.name + '的报告邀请';
    console.log(this.emailContent);
    this.heroService.sendMail(this.emailContent);

  }

}


