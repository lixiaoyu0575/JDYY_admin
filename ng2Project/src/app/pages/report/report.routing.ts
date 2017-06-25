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
import { ReportListComponent } from './components/report-list/report-list.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      { path: 'list', component: HeroesComponent },
      { path: 'reportlist', component: ReportListComponent },
      { path: 'apply/:name', component: ApplyComponent },
      { path: 'diagnose/:name', component: AddHeroComponent },
      { path: 'add', component: AddHeroComponent },
      { path: 'imgViewer/:id', loadChildren: './Application/img-viewer.module#ImgViewerModule' },
    ],
  },
];
export const routing = RouterModule.forChild(routes);
