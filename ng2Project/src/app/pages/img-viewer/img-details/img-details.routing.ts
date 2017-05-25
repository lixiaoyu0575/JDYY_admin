/**
 * Created by xiaoyu on 17-5-25.
 */
import { Routes, RouterModule } from '@angular/router';
import { ImgDetailsComponent } from './img-details.component';

const routes: Routes = [
  {
    path: '',
    component: ImgDetailsComponent,
  },
];
export const routing = RouterModule.forChild(routes);
