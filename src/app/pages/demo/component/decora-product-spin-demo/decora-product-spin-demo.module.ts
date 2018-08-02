import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DecoraProductSpinDemoRoutingModule} from './decora-product-spin-demo-routing.module';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecoraProductSpinDemoComponent } from './decora-product-spin-demo.component';
import { DecProductSpinModule } from 'projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraProductSpinDemoRoutingModule,
    DemoContainerModule,
    DecProductSpinModule,
  ],
  declarations: [
    DecoraProductSpinDemoComponent
  ]
})
export class DecoraProductSpinDemoModule {
}
