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
    { 'label': '报告详情' , 'id': 0 },
    { 'label': '查看阅片申请' , 'id': 1 },
    { 'label': '报告记录' , 'id': 2 },
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

  constructor(private router: Router, private route: ActivatedRoute,
              private heroService: HeroService,
              private loginService: LoginService,
              private location: Location,
              private modalService: NgbModal) {}

/*  getUser(): void {
    this.loginService.getuser().then((data) => {
      // this.source.load(data);
      this.users = data;
      this.nowuser = localStorage['user_name'];
      this.selecteduser = data[0].name;
      this.shareTo = data[1].name;
      this.emailContent.recipients = data[1].email;
    });
  }*/
  getReports(): void {
    this.heroService.getReport().then((res) => {
      console.log(res);
      this.reports = res;
      console.log(this.reports);
    });
  }
  goBack(): void {
    this.location.back(); // !
  }
/*  doShare(): void {
    this.selectedHero.user.push(this.shareTo);
    this.heroService.update(this.selectedHero)
      .then(() => {
        alert('发送成功');
      });
  }*/
  getHero(): void {
      this.heroService.getHero(this.selectedReport.id)
        .then(hero => {
          console.log(hero);
          this.hero = hero[0];
        });
  }

  ngOnInit(): void {
    this.getReports();
  }

  onswitch(nav: any): void {
    this.selectedTab = nav.id;
    console.log(this.selectedTab);
  }

  onSelect(diagnosisReport: DiagnosisReport): void {
    this.selectedTab = 0;
    this.selectedReport = diagnosisReport;
  }
}
 /* gotoDetail(): void {
    this.router.navigate
    (['../imgViewer' , this.selectedHero.name, 'applyDetail', this.selectedHero.name], { relativeTo: this.route } );

  }

  gotoAdd(): void {
    this.router.navigate(['../sendapply'], { relativeTo: this.route } );
  }

  sendMail() {
    this.emailContent.message = '' + this.nowuser + '发来了报告诊断申请';
    console.log(this.emailContent);
    this.heroService.sendMail(this.emailContent);

  }
}*/

