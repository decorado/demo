import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSketchfabDemoComponent } from './dec-sketchfab-demo.component';
import { DecSketchfabDemoRoutingModule } from './dec-sketchfab-demo-routing.module';
import { DecSketchfabModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecSketchfabDemoRoutingModule,
    DecSketchfabModule
  ],
  declarations: [
    DecSketchfabDemoComponent
  ],
  exports: [
    DecSketchfabDemoComponent
  ]
})
export class DecSketchfabDemoModule { }
