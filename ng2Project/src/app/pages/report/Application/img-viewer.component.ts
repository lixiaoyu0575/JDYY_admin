import 'rxjs/add/operator/toPromise';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HeroService } from '../components/List/hero.service';
import { Hero } from '../components/List/hero';
@Component({
  selector: 'img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})

export class ImgViewerComponent implements OnInit {
  navLinks: object[];
  hero: Hero;
  constructor(private http: Http, private route: ActivatedRoute, private heroService: HeroService) {
    this.navLinks = [];
  }
  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.heroService.getHero(params['name']))
      .subscribe(hero => {
        this.hero = hero[0];
        this.navLinks.push({
          'url': 'applyDetail/' + this.hero.name,
          'label': '申请详情',
        });
        this.navLinks.push({
          'url': 'diagnosisReport/' + this.hero.name,
          'label': '填写诊断报告',
        });
      });
  }
}
