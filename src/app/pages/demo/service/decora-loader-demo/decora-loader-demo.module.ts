import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraLoaderDemoRoutingModule } from './decora-loader-demo-routing.module';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecoraLoaderDemoComponent } from './decora-loader-demo.component';
import { DecLoaderModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DecoraLoaderDemoRoutingModule,
    DemoContainerModule,
    MatButtonModule,
    DecLoaderModule
  ],
  declarations: [
    DecoraLoaderDemoComponent
  ],
  exports: [
    DecoraLoaderDemoComponent
  ]
})
export class DecoraLoaderDemoModule { }
