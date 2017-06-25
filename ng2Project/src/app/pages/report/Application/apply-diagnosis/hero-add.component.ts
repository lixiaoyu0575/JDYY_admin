/**
 * Created by th3ee on 5/19/17.
 */
import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../../components/List/hero.service';
import { Router , ActivatedRoute , Params } from '@angular/router';
import { Hero } from '../../components/List/hero';
import { DiagnosisReport } from './hero-add';
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
  description: string;
  diagnosis: string;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private heroService: HeroService,
              private report: DiagnosisReport,
              private location: Location) {}
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  formInit(): void {
    this.description = '';
    this.diagnosis = '';
  }
  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.heroService.getHero(params['id']))
      .subscribe(hero => {
        this.hero = hero[0];
        console.log(this.hero);
        this.report.id = this.hero.id;
        this.report.name = this.hero.name;
        this.report.age = this.hero.age;
        this.report.scan = this.hero.scantype;
        this.report.date = this.hero.time;
        this.report.status = '报告已完成,待审核';
        console.log(this.report);
      });
     this.getHeroes();
     this.formInit();
  }
  gotoHeroes(): void {
    this.router.navigate(['../../../../list'], { relativeTo: this.route } ); // !
  }

  addReport(report: DiagnosisReport): void {
    this.report.description = this.description;
    this.report.diagnosis = this.diagnosis;
    console.log(this.report);
    this.heroService.createReport(report).then( res => {
      console.log(res);
    });
  }

  update(): void {
    console.log(this.hero.status);
    this.hero.status = '已审核';
    console.log(this.hero.status);
    this.heroService.update(this.hero);
  }
}
