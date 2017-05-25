/**
 * Created by xiaoyu on 17-5-14.
 */
import { Routes, RouterModule } from '@angular/router';
import { ImgViewerComponent } from './img-viewer.component';
import { DataTablesComponent } from './dataTables/dataTables.component';
import { ImgDetailsComponent } from './img-details/img-details.component';

const routes: Routes = [
  {
    path: '',
    component: ImgViewerComponent,
    children: [
      {
        path: 'tables',
        component: DataTablesComponent,
      },
      {
        path: 'details',
        component: ImgDetailsComponent,
      },
    ],
  },
];
export const routing = RouterModule.forChild(routes);
