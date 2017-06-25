import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { Tables } from './tables.component';
import { BasicTables } from './components/basicTables/basicTables.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { DataTables } from './components/dataTables/dataTables.component';
import { HotTablesComponent } from './components/hotTables/hotTables.component';
import { ImageTableComponent } from './components/image-table/image-table.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
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
      { path: 'imgViewer/:ID', loadChildren: './img-viewer/img-viewer.module#ImgViewerModule' },
      { path: 'imageGallery', component: ImageGalleryComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
