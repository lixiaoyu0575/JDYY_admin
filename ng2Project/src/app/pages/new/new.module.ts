/**
 * Created by xiaoyu on 17-5-14.
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { NewComponent } from "./new.component";
import { routing } from "./new.routing";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    NewComponent
  ]
})
export class NewModule {}
