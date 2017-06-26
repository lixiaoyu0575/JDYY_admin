/**
 * Created by th3ee on 6/19/17.
 */
/**
 * Created by th3ee on 5/23/17.
 */
/**
 * Created by th3ee on 5/18/17.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound.component';

const routes: Routes = [
  {
    path: 'notfound',
    component: NotfoundComponent,
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class NotfoundRoutingModule {}
