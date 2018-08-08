import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecScriptLoaderModule } from './../../services/script-loader/dec-script-loader.module';
import { DecSketchfabViewComponent } from './dec-sketchfab-view.component';

@NgModule({
  imports: [
    CommonModule,
    DecScriptLoaderModule
  ],
  declarations: [
    DecSketchfabViewComponent
  ],
  exports: [
    DecSketchfabViewComponent
  ]
})
export class DecSketchfabViewModule { }
