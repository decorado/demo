import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecoraLabelDemoComponent } from './decora-label-demo.component';
import { DecoraLabelDemoRoutingModule } from './decora-label-demo-routing.module';
import { DecLabelModule } from '@decora/browser-lib-ui';

@NgModule({
  imports: [
    CommonModule,
    DemoContainerModule,
    DecoraLabelDemoRoutingModule,
    FlexLayoutModule,
    DecLabelModule
  ],
  declarations: [DecoraLabelDemoComponent]
})
export class DecoraLabelDemoModule { }
