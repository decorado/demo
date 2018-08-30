import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraImageMarksDemoRoutingModule } from './decora-image-marks-demo-routing.module';
import { DecoraImageMarksDemoComponent } from './decora-image-marks-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { MatButtonModule } from '@angular/material';
import { DecImageMarkerModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-image-marker/dec-image-marker.module';
import { DecImageMarksModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-image-marks/dec-image-marks.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecGalleryMarksModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-gallery-marks/dec-gallery-marks.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    DecoraImageMarksDemoRoutingModule,
    DecImageMarksModule,
    DecImageMarkerModule,
    DemoContainerModule,
    MatButtonModule,
    DecGalleryMarksModule
  ],
  declarations: [DecoraImageMarksDemoComponent]
})
export class DecoraImageMarksDemoModule { }
