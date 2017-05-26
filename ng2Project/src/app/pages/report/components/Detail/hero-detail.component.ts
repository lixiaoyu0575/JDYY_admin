/**
 * Created by th3ee on 5/17/17.
 */
import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../List/hero.service';
import 'rxjs/add/operator/switchMap'; // make the parameters Observable
import { Hero } from '../List/hero';
@Component({
  moduleId: module.id,
  selector: 'detail',
  templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}
  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back(); // !
  }
  doVerify(): void {
    this.hero.status = 1;
  }
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}
