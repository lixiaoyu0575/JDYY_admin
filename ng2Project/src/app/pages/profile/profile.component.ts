/**
 * Created by yqzheng on 2017/6/20.
 */
import {Component} from '@angular/core';
import { Router , ActivatedRoute , Params } from '@angular/router';
import { Hero , User } from '../report/components/List/hero';
import { HeroService } from '../report/components/List/hero.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.html',
})
export class profile {

  hero: Hero;
  heroes: Hero[];
  users: User[];
  nowuser:string;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute,
  ) {}

  gotoHeroes(): void {
    this.router.navigate(['../'], { relativeTo: this.route } ); // !
  }
  changeInfo(){
    console.log("changeInfo");
    this.router.navigate(['../personalInform'],{relativeTo:this.route});
  }
  gotoList(){
    console.log("gotoList!");
    this.router.navigate(['../dataTables'],{relativeTo:this.route});
  }
  gotoMessage(){
    console.log("gotoMessage!");
    this.router.navigate(['../feed'],{relativeTo:this.route});
  }
  lgModalShow(){
    console.log('modal!')

  }
  getUser(): void {
    this.loginService.getuser().then((data) => {
      this.users = data;
      this.nowuser = data[0].name;
      console.log(this.users);
      console.log(this.nowuser);
    });
  }
  getHeroes(): void {
    this.heroService.getHeroes().then((heroes) => {
      console.log(heroes);
      this.heroes = heroes;
      console.log(this.heroes);
      this.hero=heroes[0];
      console.log(this.hero);
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.getHeroes();

  }
}
