import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DiagnosisReport } from '../../../report/Application/apply-diagnosis/hero-add';
import { HeroService } from '../../../report/components/List/hero.service';

@Component({
  selector: 'app-data-table-record',
  templateUrl: './data-table-record.component.html',
  styleUrls: ['./data-table-record.component.scss']
})
export class DataTableRecordComponent implements OnInit {

  report: DiagnosisReport;
  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  goback():void{
    console.log("back!");
    this.router.navigate(['../../dataTables'],{relativeTo:this.route});
  }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.service.getReportDetail(params['examID']))
      .subscribe(report => {
        console.log(report);
        this.report = report[0];
      });
  }

}

