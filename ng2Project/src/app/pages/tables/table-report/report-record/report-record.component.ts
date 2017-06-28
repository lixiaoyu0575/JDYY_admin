import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DiagnosisReport } from '../../../report/Application/apply-diagnosis/hero-add';
import { HeroService } from '../../../report/components/List/hero.service';

@Component({
  selector: 'app-report-record',
  templateUrl: './report-record.component.html',
  styleUrls: ['./report-record.component.scss']
})
export class ReportRecordComponent implements OnInit {
  report: DiagnosisReport;
  data;

  constructor(private service: HeroService, private route: ActivatedRoute) { }

  ngOnInit(): void {

      this.route.params.switchMap((params: Params) => this.service.getReportRecord(params['examID']))
      .subscribe(record => {
        console.log(record);
        this.data = record;
      });
  }

}
