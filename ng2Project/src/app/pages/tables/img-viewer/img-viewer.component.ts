import 'rxjs/add/operator/toPromise';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HeroService } from '../../report/components/List/hero.service';

@Component({
  selector: 'img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})

export class ImgViewerComponent implements OnInit {
  navLinks: object[];
  item;
  constructor(private http: Http, private route: ActivatedRoute, private heroService: HeroService) {
    this.navLinks = [];
  }
  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.heroService.getItem(params['ID']))
      .subscribe(item => {
        console.log(item);
        this.item = item;
        this.navLinks.push({
          'url': 'imageDetail',
          'label': '影像详情',
        });
        this.navLinks.push({
          'url': 'applyDetail/' + this.item.ID,
          'label': '发送申请',
        });
      });
  }

}
