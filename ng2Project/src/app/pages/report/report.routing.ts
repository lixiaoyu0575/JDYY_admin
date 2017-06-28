/**
 * Created by th3ee on 5/23/17.
 */
/**
 * Created by th3ee on 5/18/17.
 */
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report.component';
import { HeroesComponent } from './components/List/heroes.component';
import { AddHeroComponent } from './Application/apply-diagnosis/hero-add.component';
import { ApplyComponent } from './Application/apply-detail/apply.component';
import { ApplyListComponent } from './Apply-station/apply-list.component';
import { ReportListComponent } from './components/report-list/report-list.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      { path: 'list', component: ApplyListComponent },
      { path: 'reportlist', component: ReportListComponent },
      { path: 'apply/:name', component: ApplyComponent },
      { path: 'diagnose/:name', component: AddHeroComponent },
      { path: 'add', component: AddHeroComponent },
      { path: 'imgViewer/:examID', loadChildren: './Application/img-viewer.module#ImgViewerModule' },
      { path: 'applyEdit/:examID', loadChildren: './Apply-station/img-viewer/Apply-edit.module#ApplyEditModule' },
    ],
  },
];
export const routing = RouterModule.forChild(routes);
