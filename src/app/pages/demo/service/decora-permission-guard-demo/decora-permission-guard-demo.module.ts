import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraPermissionGuardDemoComponent } from './decora-permission-guard-demo.component';
import { DecoraPermissionGuardDemoRoutingModule } from './decora-permission-guard-demo-routing.module';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecPermissionGuardModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraPermissionGuardDemoRoutingModule,
    DecPermissionGuardModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraPermissionGuardDemoComponent
  ],
  exports: [
    DecoraPermissionGuardDemoComponent
  ]
})
export class DecoraPermissionGuardDemoModule { }
