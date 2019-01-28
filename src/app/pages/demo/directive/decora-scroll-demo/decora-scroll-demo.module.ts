import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraScrollDemoRoutingModule } from './decora-scroll-demo-routing.module';
import { DecoraScrollDemoComponent } from './decora-scroll-demo.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecScrollModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DecoraScrollDemoRoutingModule,
    FlexLayoutModule,
    DecScrollModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraScrollDemoComponent
  ],
  exports: [
    DecoraScrollDemoComponent
  ]
})
export class DecoraScrollDemoModule { }
