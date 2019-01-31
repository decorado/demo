import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSketchfabViewComponent } from './dec-sketchfab-view.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [
    DecSketchfabViewComponent
  ],
  exports: [
    DecSketchfabViewComponent
  ]
})
export class DecSketchfabViewModule { }
