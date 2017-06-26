/**
 * Created by th3ee on 5/17/17.
 */
import { Component , OnInit , Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../List/hero.service';
import 'rxjs/add/operator/switchMap'; // make the parameters Observable
import { DiagnosisReport } from '../../../Application/apply-diagnosis/hero-add';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'report-detail',
  templateUrl: './report-detail.component.html',
})
export class ReportDetailComponent {
  @Input() report: DiagnosisReport;
}
