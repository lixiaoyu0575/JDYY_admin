import { Component, OnInit } from '@angular/core';
import { DiagnosisReport } from '../../Application/apply-diagnosis/hero-add';
import { HeroService } from '../List/hero.service';
import { LoginService } from '../../../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hero , User } from '../List/hero';
import { DefaultModal } from '../default-modal/default-modal.component';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: './report-list.component.html'
  ,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})
export class ReportListComponent implements OnInit {

  navLinks = [
    { 'label': '报告详情' , 'id': 0 , 'select': true },
    { 'label': '查看阅片申请' , 'id': 1 , 'select': false },
    { 'label': '报告记录' , 'id': 2 , 'select': false },
  ];
  hero: Hero;
  selectedTab: number;
  idFilterQuery = '';
  nameFilterQuery = '';
  ageFilterQuery = '';
  scanFilterQuery = '';
  timeFilterQuery = '';
  statusFilterQuery = '';
  rowsOnPage = 10;
  sortBy = 'email';
  sortOrder = 'asc';
  reports: DiagnosisReport[];
  shareTo: string;
  selectedReport: DiagnosisReport;
  nowuser: string;
  title= 'Tour of Heros';
  source: LocalDataSource = new LocalDataSource();
  startdate: string;
  enddate: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private heroService: HeroService,
              private loginService: LoginService,
              ) {}


  getReports(): void {
    this.heroService.getReport().then((res) => {
      console.log(res);
      this.reports = res;
      console.log(this.reports);
    });
  }

  getHero(): void {
      this.heroService.getHero(this.selectedReport.examID)
        .then(hero => {
          console.log(hero);
          this.hero = hero[0];
        });
  }

  ngOnInit(): void {
    this.startdate = this.heroService.getTime();
    this.enddate = this.startdate;
    this.getReports();
  }
  getDetails(item) {
    console.log(item);
    this.router.navigateByUrl('/pages/tables/tableReport/'
      + item.examID + '/reportDetail/' + item.examID);
  }

  onswitch(nav: any): void {
    this.selectedTab = nav.id;
    this.navLinks.forEach((n) => {
      if (n.id === nav.id) {
        n.select = true;
      } else {
        n.select = false;
      }
    });
    console.log(this.selectedTab);
  }

  onSelect(diagnosisReport: DiagnosisReport): void {
    this.selectedTab = 0;
    this.selectedReport = diagnosisReport;
  }
}


