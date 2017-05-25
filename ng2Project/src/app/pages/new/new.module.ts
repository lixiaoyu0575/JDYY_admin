/**
 * Created by xiaoyu on 17-5-14.
 */
import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { TreeModule } from 'angular-tree-component';

import { NewComponent, DicomComponent } from './new.component';
import { routing } from './new.routing';

@NgModule({
  imports: [
    NgaModule,
    CommonModule,
    FormsModule,
    routing,
    MdNativeDateModule,
    MaterialModule,
    TreeModule,
  ],
  declarations: [
    NewComponent,
    DicomComponent,
  ],
})
export class NewModule {}
