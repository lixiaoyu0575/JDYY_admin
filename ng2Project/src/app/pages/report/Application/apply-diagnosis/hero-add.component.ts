/**
 * Created by th3ee on 5/19/17.
 */
import { Component, OnInit, Input } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { HeroService } from '../../components/List/hero.service';
import { Router , ActivatedRoute , Params } from '@angular/router';
import { Hero } from '../../components/List/hero';
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
              private location: Location,
              private snackBar: MdSnackBar
  ) {}
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.heroService.getHero(params['name']))
      .subscribe(hero => {
        this.hero = hero;
      });
     this.getHeroes();
  }
  gotoHeroes(): void {
    this.router.navigate(['../../../../list'], { relativeTo: this.route } ); // !
  }

  update(): void {
    console.log(this.hero[0].status);
    this.hero[0].status = '已审核';
    console.log(this.hero[0].status);
    this.heroService.update(this.hero);
    this.snackBar.open('创建成功', '', {
      duration: 2000,
    });
  }
}
