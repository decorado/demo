import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraDownloadButtonDemoRoutingModule } from './decora-download-button-demo-routing.module';
import { DecoraDownloadButtonDemoComponent } from './decora-download-button-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecDownloadButtonModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraDownloadButtonDemoRoutingModule,
    DemoContainerModule,
    DecDownloadButtonModule
  ],
  declarations: [
    DecoraDownloadButtonDemoComponent
  ],
  exports: [
    DecoraDownloadButtonDemoComponent
  ],
})
export class DecoraDownloadButtonDemoModule { }
