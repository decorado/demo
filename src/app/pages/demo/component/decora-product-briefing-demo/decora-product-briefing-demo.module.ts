import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraProductBriefingDemoRoutingModule } from './decora-product-briefing-demo-routing.module';
import { DecoraProductBriefingDemoComponent } from './decora-product-briefing-demo.component';
import { DecProductBriefingModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  declarations: [
    DecoraProductBriefingDemoComponent
  ],
  imports: [
    CommonModule,
    DecoraProductBriefingDemoRoutingModule,
    DecProductBriefingModule
  ],
  exports: [
    DecoraProductBriefingDemoComponent
  ]
})
export class DecoraProductBriefingDemoModule { }
