/**
 * Created by xiaoyu on 17-5-14.
 */
import { Routes, RouterModule } from '@angular/router';
import { NewComponent, DicomComponent } from './new.component';

const routes: Routes = [
  {
    path: '',
    component: DicomComponent,
    // component: NewComponent,
  },
];
export const routing = RouterModule.forChild(routes);
