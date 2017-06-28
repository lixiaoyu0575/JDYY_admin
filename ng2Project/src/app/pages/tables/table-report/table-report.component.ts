import 'rxjs/add/operator/toPromise';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HeroService } from '../../report/components/List/hero.service';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.scss']
})
export class TableReportComponent implements OnInit {

  navLinks: object[];
  item;
  constructor(private http: Http, private route: ActivatedRoute, private heroService: HeroService) {
    this.navLinks = [];
  }
  ngOnInit(): void {
    this.route.params.switchMap((params: Params) => this.heroService.getItemByEid(params['examID']))
      .subscribe(item => {
        console.log(item);
        this.item = item;
        this.navLinks.push({
          'url': 'applyDetail/' + this.item.examID,
          'label': '申请单',
        });
        this.navLinks.push({
          'url': 'reportDetail/' + this.item.examID,
          'label': '报告详情',
        });
        this.navLinks.push({
          'url': 'reportRecord/' + this.item.examID,
          'label': '操作记录',
        });
      });
  }
}
