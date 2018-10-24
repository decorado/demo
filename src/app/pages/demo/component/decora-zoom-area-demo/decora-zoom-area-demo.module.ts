import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraZoomAreaDemoRoutingModule } from './decora-zoom-area-demo-routing.module';
import { DecoraZoomAreaDemoComponent } from './decora-zoom-area-demo.component';
import { DecZoomAreaModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraZoomAreaDemoRoutingModule,
    DecZoomAreaModule
  ],
  declarations: [
    DecoraZoomAreaDemoComponent
  ],
  exports: [
    DecoraZoomAreaDemoComponent
  ]
})
export class DecoraZoomAreaDemoModule { }
