/**
 * Created by yqzheng on 2017/6/20.
 */
import { Routes, RouterModule } from '@angular/router';
import { DataTables } from './dataTables/dataTables.component';
import { Feed } from './feed/feed.component';
import {personalInform } from './personalInform/personalInform.component';
import { User } from "./user/user.component";
import { profile } from './profile.component';
import { DataTableRecordComponent } from './dataTables/data-table-record/data-table-record.component';

const routes: Routes = [
  {
    path: '',
    component: profile
  },
  { path: 'dataTables', component: DataTables },
  {path:'feed',component:Feed},
  {path:'personalInform',component:personalInform},
  {path:'dataTableRecord/:examID',component:DataTableRecordComponent},
  {path:'data',component:User}
];

export const routing = RouterModule.forChild(routes);
