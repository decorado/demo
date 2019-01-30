import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraCountdownDemoRoutingModule } from './decora-countdown-demo-routing.module';
import { DecoraCountdownDemoComponent } from './decora-countdown-demo.component';
import { DecCountdownModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  declarations: [DecoraCountdownDemoComponent],
  imports: [
    CommonModule,
    DecoraCountdownDemoRoutingModule,
    DecCountdownModule,
    DemoContainerModule,
  ]
})
export class DecoraCountdownDemoModule { }
