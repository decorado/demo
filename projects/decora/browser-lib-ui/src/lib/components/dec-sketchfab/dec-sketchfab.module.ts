import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSketchfabComponent } from './dec-sketchfab.component';
import { DecSketchfabViewModule } from './../sketchfab-view/dec-sketchfab-view.module';
import { DecSketchfabService } from './dec-sketchfab.service';
import { MatSliderModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DecSketchfabViewModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    DecSketchfabComponent
  ],
  exports: [
    DecSketchfabComponent
  ],
  providers: [
    DecSketchfabService
  ]
})
export class DecSketchfabModule { }
