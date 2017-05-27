import { Routes, RouterModule } from '@angular/router';

import { Tables } from './tables.component';
import { BasicTables } from './components/basicTables/basicTables.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { DataTables } from './components/dataTables/dataTables.component';
import { HotTablesComponent } from './components/hotTables/hotTables.component';
import { ImageTableComponent } from './components/image-table/image-table.component';
import { ImgViewerComponent } from './components/img-viewer/img-viewer.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Tables,
    children: [
      { path: 'basictables', component: BasicTables },
      { path: 'smarttables', component: SmartTables },
      { path: 'datatables', component: DataTables },
      { path: 'hottables', component: HotTablesComponent },
      { path: 'imageTable', component: ImageTableComponent },
      { path: 'imgViewer', component: ImgViewerComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
