/**
 * Created by yqzheng on 2017/6/20.
 */
import { Routes, RouterModule } from '@angular/router';

import { profile } from './profile.component';

const routes: Routes = [
  {
    path: '',
    component: profile
  }
];

export const routing = RouterModule.forChild(routes);
