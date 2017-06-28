/**
 * Created by th3ee on 5/17/17.
 */
import { Component , OnInit , Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap'; // make the parameters Observable
import { DiagnosisReport } from '../../../report/Application/apply-diagnosis/hero-add';
import { HeroService } from '../../../report/components/List/hero.service';

@Component({
  selector: 'report-detail',
  templateUrl: './report-detail.component.html',
})
export class ReportDetailComponent implements OnInit {

  report: DiagnosisReport;
  doEdit = false;
  doSwith(): void {
    this.doEdit = !this.doEdit;
  }

  constructor(private service: HeroService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {

    this.route.params.switchMap((params: Params) => this.service.getReportDetail(params['examID']))
      .subscribe(report => {
        console.log(report);
        this.report = report[0];
      });
  }
  doUpdate(verify: string): void {
    if (verify === 'doVerify') {
      this.report.status = '已审核';
      this.service.updateReport(this.report).then((res) => {
        console.log(res);
        this.service.addReportRecord(
          { 'examID': this.report.examID ,
          'operate_type': '审核报告',
          'name': localStorage['user_name'],
          'date': this.service.getTime()},
          );
      });
    } else {
    this.service.updateReport(this.report).then((res) => {
      console.log(res);
      this.service.addReportRecord(
        { 'examID': this.report.examID ,
        'operate_type': '修改报告',
        'name': localStorage['user_name'],
        'date': this.service.getTime()},
        );
       },
      );
    }
  }
}
