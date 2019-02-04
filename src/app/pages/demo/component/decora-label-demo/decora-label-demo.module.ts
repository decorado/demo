import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecoraLabelDemoComponent } from './decora-label-demo.component';
import { DecoraLabelDemoRoutingModule } from './decora-label-demo-routing.module';
import { DecLabelModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DecLabelStatusModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-label-status/dec-label-status.module';

@NgModule({
  imports: [
    CommonModule,
    DemoContainerModule,
    DecoraLabelDemoRoutingModule,
    FlexLayoutModule,
    DecLabelModule,
    DecLabelStatusModule
  ],
  declarations: [DecoraLabelDemoComponent]
})
export class DecoraLabelDemoModule { }
