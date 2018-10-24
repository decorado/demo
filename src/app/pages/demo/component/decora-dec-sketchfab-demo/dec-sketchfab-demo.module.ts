import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSketchfabDemoComponent } from './dec-sketchfab-demo.component';
import { DecSketchfabDemoRoutingModule } from './dec-sketchfab-demo-routing.module';
import { DecSketchfabModule, DecColorPickerModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DecSketchfabDemoRoutingModule,
    DecSketchfabModule,
    DecColorPickerModule
  ],
  declarations: [
    DecSketchfabDemoComponent
  ],
  exports: [
    DecSketchfabDemoComponent
  ]
})
export class DecSketchfabDemoModule { }
