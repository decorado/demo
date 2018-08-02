import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecoraImageDemoRoutingModule } from './decora-image-demo-routing.module';
import { DecoraImageDemoComponent } from './decora-image-demo.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DecImageModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DemoContainerModule,
    DecoraImageDemoRoutingModule,
    DecImageModule,
    FlexLayoutModule
  ],
  declarations: [DecoraImageDemoComponent]
})
export class DecoraImageDemoModule { }
