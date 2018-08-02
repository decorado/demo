import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraPermissionDemoComponent } from './decora-permission-demo.component';
import { DecoraPermissionDemoRoutingModule } from './decora-permission-demo-routing.module';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecPermissionModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraPermissionDemoRoutingModule,
    DecPermissionModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraPermissionDemoComponent
  ],
  exports: [
    DecoraPermissionDemoComponent
  ]
})
export class DecoraPermissionDemoModule { }
