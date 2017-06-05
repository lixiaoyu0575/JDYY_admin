/**
 * Created by th3ee on 5/19/17.
 */
import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from './hero.service';
import { Router , ActivatedRoute , Params } from '@angular/router';
import { Hero } from './hero';
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'add-hero',
  templateUrl: './hero-add.component.html',
})

export class AddHeroComponent implements OnInit {
  heroes: Hero[];
  hero: Hero;
  selectedHero: Hero;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) {}
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.heroService.getHero(params['name']))
      .subscribe(hero => {
        console.log(hero);
        this.hero = hero;
      });
     this.getHeroes();
  }
  gotoHeroes(): void {
    this.router.navigate(['../../'], { relativeTo: this.route } ); // !
  }
  /*save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }*/

  add(name: string, age: string, reason: string, originaldiagnosis: string, status: number, user: any[]): void {
    name = name.trim();
    age = age.trim();
    status = 0;
    user = ['Andy'];
    this.hero.status = 1;
    if (!name) {
      return;
    }
    this.heroService.update(this.hero);
    /*this.heroService.create(name, age, status, user).then( hero => {
      console.log(hero);
      this.heroes.push(hero);
      this.selectedHero = null;
    });*/
  }
}
