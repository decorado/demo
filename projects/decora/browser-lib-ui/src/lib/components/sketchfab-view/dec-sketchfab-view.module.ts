import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecScriptLoaderModule } from './../../services/script-loader/dec-script-loader.module';
import { DecSketchfabViewComponent } from './dec-sketchfab-view.component';
import { DecColorServiceModule } from './../../services/color/dec-color-service.module';
import { MatInputModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DecScriptLoaderModule,
    DecColorServiceModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    DecSketchfabViewComponent
  ],
  exports: [
    DecSketchfabViewComponent
  ]
})
export class DecSketchfabViewModule { }
