/**
 * Created by th3ee on 5/18/17.
 */
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero []= [];
  constructor(private heroservice: HeroService) {}
  ngOnInit(): void {
    this.heroservice.getHeroes().then(
      heroes => this.heroes = heroes.slice(0, 4)
    );
  }
}
