import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraCarouselDemoRoutingModule } from './decora-carousel-demo-routing.module';
import { DecoraCarouselDemoComponent } from './decora-carousel-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { DecCarouselModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    DecoraCarouselDemoRoutingModule,
    DemoContainerModule,
    DecCarouselModule,
  ],
  declarations: [DecoraCarouselDemoComponent]
})
export class DecoraCarouselDemoModule { }
