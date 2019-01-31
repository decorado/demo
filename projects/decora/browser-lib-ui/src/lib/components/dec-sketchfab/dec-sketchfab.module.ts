import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSketchfabComponent } from './dec-sketchfab.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DecSketchfabViewModule } from '../sketchfab-view/dec-sketchfab-view.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    DecSketchfabViewModule
  ],
  declarations: [
    DecSketchfabComponent
  ],
  exports: [
    DecSketchfabComponent
  ]
})
export class DecSketchfabModule { }
