import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraInputTimeDemoRoutingModule } from './decora-input-time-demo-routing.module';
import { DecoraInputTimeDemoComponent } from './decora-input-time-demo.component';
import { DecInputTimeModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-input-time/dec-input-time.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  declarations: [DecoraInputTimeDemoComponent],
  imports: [
    CommonModule,
    DecoraInputTimeDemoRoutingModule,
    DecInputTimeModule,
    FormsModule,
    ReactiveFormsModule,
    DemoContainerModule,
  ]
})
export class DecoraInputTimeDemoModule { }
