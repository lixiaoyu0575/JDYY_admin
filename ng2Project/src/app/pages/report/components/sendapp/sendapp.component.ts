/**
 * Created by th3ee on 5/19/17.
 */
import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../List/hero.service';
import { Router , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../List/user.service';
import { Hero , User } from '../List/hero';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  moduleId: module.id,
  selector: 'add-hero',
  templateUrl: './sendapp.component.html',
})

export class SendApplyComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  users: User[];
  applyTo: string;
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
  add(name: string, age: string, status: number, user: any[]): void {
    name = name.trim();
    age = age.trim();
    status = 0;
    user = [this.applyTo];
    if (!name) {
      return;
    }
    this.heroService.create(name, age, status, user).then( hero => {
      console.log(hero);
      this.heroes.push(hero);
      this.selectedHero = null;
    });
  }
}
