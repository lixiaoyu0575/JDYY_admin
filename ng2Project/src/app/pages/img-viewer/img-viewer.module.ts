import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { NgaModule } from '../../theme/nga.module';
import { MdDialogModule } from '@angular/material';

import { DataTablesService } from './dataTables/dataTables.service';
import { DataFilterPipe } from './dataTables/data-filter.pipe';

import { ImgViewerComponent } from './img-viewer.component';
import { DataTablesComponent, TestDialogComponent } from './dataTables/dataTables.component';
import { ImgDetailsComponent } from './img-details/img-details.component';

import { routing } from './img-viewer.routing';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    routing,
    DataTableModule,
    MdDialogModule,
  ],
  entryComponents: [
    TestDialogComponent,
  ],
  declarations: [
    ImgViewerComponent,
    DataTablesComponent,
    DataFilterPipe,
    ImgDetailsComponent,
    TestDialogComponent,
  ],
  providers: [
    DataTablesService,
  ],
})
export class ImgViewerModule { }
