import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraImageZoomDemoComponent } from './decora-image-zoom-demo.component';
import { DecoraImageZoomDemoRoutingModule } from './decora-image-zoom-demo-routing.module';
import { DecZoomImageViewModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraImageZoomDemoRoutingModule,
    DecZoomImageViewModule
  ],
  declarations: [
    DecoraImageZoomDemoComponent
  ], 
  exports: [
    DecoraImageZoomDemoComponent
  ]
})
export class DecoraImageZoomDemoModule { }
