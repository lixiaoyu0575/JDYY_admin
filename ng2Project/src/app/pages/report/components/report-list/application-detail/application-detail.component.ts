/**
 * Created by th3ee on 5/17/17.
 */
import { Component, Input } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Hero , User } from '../../List/hero';
@Component({
  selector: 'application-detail',
  templateUrl: './application-detail.component.html',
})
export class ApplicationDetailComponent  {
  @Input() hero: Hero;
}
