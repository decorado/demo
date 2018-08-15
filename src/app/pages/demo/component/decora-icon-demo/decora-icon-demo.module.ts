import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraIconDemoRoutingModule } from './decora-icon-demo-routing.module';
import { DecoraIconDemoComponent } from './decora-icon-demo.component';
import { DecIconModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-icon/dec-icon.module';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DecoraIconDemoRoutingModule,
    DecIconModule,
    DemoContainerModule,
    FlexLayoutModule,
  ],
  declarations: [DecoraIconDemoComponent]
})
export class DecoraIconDemoModule { }
