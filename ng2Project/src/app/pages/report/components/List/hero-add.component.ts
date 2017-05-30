/**
 * Created by th3ee on 5/19/17.
 */
import {Component, OnInit, Input} from '@angular/core';
import { HeroService } from './hero.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { Hero } from './hero';
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'add-hero',
  templateUrl: './hero-add.component.html',
})

export class AddHeroComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(private router: Router,private route: ActivatedRoute, private heroService: HeroService, private location: Location) {}
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  gotoHeroes(): void {
    this.router.navigate(['../list'], { relativeTo: this.route } ); // !
  }
  add(name: string, age: string, status: number): void {
    name = name.trim();
    age = age.trim();
    status = 0;
    if (!name) {return; }
    this.heroService.create(name, age, status).then( hero => {
      console.log(hero);
      this.heroes.push(hero);
      this.selectedHero = null;
    });
  }
}
