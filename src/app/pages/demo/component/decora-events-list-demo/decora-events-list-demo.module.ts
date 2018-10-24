import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraEventsListDemoRoutingModule } from './decora-events-list-demo-routing.module';
import { DecoraEventsListDemoComponent } from './decora-events-list-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecEventsListModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraEventsListDemoRoutingModule,
    DemoContainerModule,
    DecEventsListModule,
  ],
  declarations: [DecoraEventsListDemoComponent]
})
export class DecoraEventsListDemoModule { }
