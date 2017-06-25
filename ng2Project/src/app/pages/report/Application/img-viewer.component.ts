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
  hero;
  constructor(private http: Http, private route: ActivatedRoute, private heroService: HeroService) {
    this.navLinks = [];
  }
  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.heroService.getHero(params['id']))
      .subscribe((res) => {
        this.hero = res[0];
        console.log(this.hero);
        this.navLinks.push({
          'url': 'applyDetail/' + this.hero.id,
          'label': '申请详情',
        });
        this.navLinks.push({
          'url': 'imageDetail',
          'label': '影像详情',
        });
        this.navLinks.push({
          'url': 'diagnosisReport/' + this.hero.id,
          'label': '填写诊断报告',
        });
      });
  }
}
