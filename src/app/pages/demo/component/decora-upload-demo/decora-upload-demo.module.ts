import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecoraUploadDemoRoutingModule } from './decora-upload-demo-routing.module';
import { DecoraUploadDemoComponent } from './decora-upload-demo.component';
import { DecUploadModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoContainerModule,
    DecoraUploadDemoRoutingModule,
    DecUploadModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [DecoraUploadDemoComponent]
})
export class DecoraUploadDemoModule { }
