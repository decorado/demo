import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecJobRoundDemoRoutingModule } from './dec-job-round-demo-routing.module';
import { DecJobRoundDemoComponent } from './dec-job-round-demo.component';
import { DecJobRoundModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DecJobRoundDemoRoutingModule,
    DecJobRoundModule,
    DemoContainerModule
  ],
  declarations: [
    DecJobRoundDemoComponent
  ],
  exports: [
    DecJobRoundDemoComponent
  ]
})
export class DecJobRoundDemoModule { }
