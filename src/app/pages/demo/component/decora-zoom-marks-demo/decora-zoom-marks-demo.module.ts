import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraZoomMarksDemoRoutingModule } from './decora-zoom-marks-demo-routing.module';
import { DecoraZoomMarksDemoComponent } from './decora-zoom-marks-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecZoomMarksModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-zoom-marks/dec-zoom-marks.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecZoomMarksGalleryModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-zoom-marks-gallery/dec-zoom-marks-gallery.module';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { DecMarksModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraZoomMarksDemoRoutingModule,
    DemoContainerModule,
    DecZoomMarksModule,
    DecZoomMarksGalleryModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    DecMarksModule
  ],
  declarations: [DecoraZoomMarksDemoComponent],
  exports: [DecoraZoomMarksDemoComponent]
})
export class DecoraZoomMarksDemoModule { }
