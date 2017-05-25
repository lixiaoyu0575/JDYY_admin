/**
 * Created by xiaoyu on 17-5-25.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdNativeDateModule } from '@angular/material';

import { ImgDetailsComponent } from './img-details.component';
import { routing } from './img-details.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    MdNativeDateModule,
    MaterialModule,
  ],
  entryComponents: [
    ImgDetailsComponent,
  ],
  declarations: [
    ImgDetailsComponent,
  ],
})
export class ImgDetailsModule {}
