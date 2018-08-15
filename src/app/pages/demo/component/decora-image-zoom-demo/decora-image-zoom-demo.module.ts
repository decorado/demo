import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraImageZoomDemoComponent } from './decora-image-zoom-demo.component';
import { DecoraImageZoomDemoRoutingModule } from './decora-image-zoom-demo-routing.module';
import { DecImageZoomModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DecoraImageZoomDemoRoutingModule,
    DecImageZoomModule,
    DemoContainerModule,
  ],
  declarations: [
    DecoraImageZoomDemoComponent
  ],
  exports: [
    DecoraImageZoomDemoComponent
  ]
})
export class DecoraImageZoomDemoModule { }
