/**
 * Created by th3ee on 6/20/17.
 */
/**
 * Created by th3ee on 5/23/17.
 */
/**
 * Created by th3ee on 5/18/17.
 */
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { DocDetailComponent } from './components/doc-detail/doc-detail.component';


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'doctors', component: DoctorsComponent },
      { path: 'doctor/:name', component: DocDetailComponent },
      ],
  },
];
export const routing = RouterModule.forChild(routes);
