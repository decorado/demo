import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraProductInfoDemoRoutingModule } from './decora-product-info-demo-routing.module';
import { DecoraProductInfoDemoComponent } from './decora-product-info-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecProductInfoModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraProductInfoDemoRoutingModule,
    DemoContainerModule,
    DecProductInfoModule,
  ],
  declarations: [DecoraProductInfoDemoComponent]
})
export class DecoraProductInfoDemoModule { }
