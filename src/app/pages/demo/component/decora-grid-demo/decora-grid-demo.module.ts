import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraGridDemoRoutingModule } from './decora-grid-demo-routing.module';
import { DecoraGridDemoComponent } from './decora-grid-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecGridModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-grid/dec-grid.module';

@NgModule({
  imports: [
    CommonModule,
    DecoraGridDemoRoutingModule,
    DemoContainerModule,
    DecGridModule,
  ],
  declarations: [DecoraGridDemoComponent]
})
export class DecoraGridDemoModule { }
