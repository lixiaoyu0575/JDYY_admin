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
    this.route.params.switchMap((params: Params) => this.heroService.getItemByEid(params['examID']))
      .subscribe(hero => {
        this.hero = hero;
        console.log(this.hero);
        this.report.patientID = this.hero.patientID;
        this.report.examID = this.hero.examID;
        this.report.name = this.hero.name;
        this.report.age = this.hero.age;
        this.report.gender = this.hero.gender;
        this.report.examContent = this.hero.examContent;
        this.report.examPart = this.hero.examPart;
        this.report.date = this.hero.time;
        this.report.reporttime = this.heroService.getTime();
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
    this.report.status = '待审核';
    console.log(this.report);
    this.heroService.createReport(report).then( res =>
      this.heroService.addReportRecord(
        { 'examID': this.report.examID ,
          'operate_type': '生成报告',
          'name': localStorage['user_name'],
          'date': this.heroService.getTime()},
      ),
    );
    this.heroService.updateReportItem(this.hero.examID, '待审核');
    this.heroService.updateApplyItem(this.hero.examID, '诊断中');
  }

  update(): void {
    console.log(this.hero.status);
    this.hero.status = '诊断中';
    console.log(this.hero.status);
    this.heroService.update(this.hero);
  }
}
