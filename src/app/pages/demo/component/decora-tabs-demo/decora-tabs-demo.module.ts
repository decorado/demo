import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecoraTabsDemoRoutingModule } from './decora-tabs-demo-routing.module';
import { DecoraTabsDemoComponent } from './decora-tabs-demo.component';
import { DecTabsModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraTabsDemoRoutingModule,
    DecTabsModule,
    DemoContainerModule,
  ],
  declarations: [DecoraTabsDemoComponent]
})
export class DecoraTabsDemoModule { }
