import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraGalleryDemoComponent } from './decora-gallery-demo.component';
import { DecoraGalleryDemoRoutingModule } from './decora-gallery-demo-routing.module';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecGalleryModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecGalleryModule,
    DecoraGalleryDemoRoutingModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraGalleryDemoComponent
  ],
  exports: [
    DecoraGalleryDemoComponent
  ]
})
export class DecoraGalleryDemoModule { }
