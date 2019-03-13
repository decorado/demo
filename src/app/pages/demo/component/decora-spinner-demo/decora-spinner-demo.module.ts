import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraSpinnerDemoRoutingModule } from './decora-spinner-demo-routing.module';
import { DecoraSpinnerDemoComponent } from './decora-spinner-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecSpinnerModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  declarations: [DecoraSpinnerDemoComponent],
  imports: [
    CommonModule,
    DecoraSpinnerDemoRoutingModule,
    DemoContainerModule,
    DecSpinnerModule,
  ]
})
export class DecoraSpinnerDemoModule { }
