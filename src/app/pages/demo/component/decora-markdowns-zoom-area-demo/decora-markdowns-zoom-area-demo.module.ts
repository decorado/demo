import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraMarkdownsZoomAreaDemoRoutingModule } from './decora-markdowns-zoom-area-demo-routing.module';
import { DecoraMarkdownsZoomAreaDemoComponent } from './decora-markdowns-zoom-area-demo.component';
import { DecMarkdownsZoomAreaModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraMarkdownsZoomAreaDemoRoutingModule,
    DecMarkdownsZoomAreaModule
  ],
  declarations: [
    DecoraMarkdownsZoomAreaDemoComponent
  ],
  exports: [
    DecoraMarkdownsZoomAreaDemoComponent
  ]
})
export class DecoraMarkdownsZoomAreaDemoModule { }
