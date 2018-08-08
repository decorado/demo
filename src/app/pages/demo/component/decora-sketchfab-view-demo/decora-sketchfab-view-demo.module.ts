import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraSketchfabViewDemoComponent } from './decora-sketchfab-view-demo.component';
import { DecSketchfabViewModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DecoraSketchfabViewDemoRoutingModule } from './decora-sketchfab-view-demo-routing.module';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DecSketchfabViewModule,
    DecoraSketchfabViewDemoRoutingModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraSketchfabViewDemoComponent
  ],
  exports: [
    DecoraSketchfabViewDemoComponent
  ]
})
export class DecoraSketchfabViewDemoModule { }
