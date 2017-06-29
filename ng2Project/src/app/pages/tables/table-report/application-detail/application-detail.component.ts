/**
 * Created by th3ee on 5/17/17.
 */
import { Component , OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HeroService } from '../../../report/components/List/hero.service';
import 'rxjs/add/operator/switchMap';
import { Hero , User } from '../../../report/components/List/hero';


@Component({
  selector: 'application-detail',
  templateUrl: './application-detail.component.html',
})
export class ApplicationDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
  ) {}

  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.heroService.getHero(params['examID']))
      .subscribe(hero => {
        console.log(hero);
        this.hero = hero[0];
      });
  }
}

