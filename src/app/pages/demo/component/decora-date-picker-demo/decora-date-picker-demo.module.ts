import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraDatePickerDemoRoutingModule } from './decora-date-picker-demo-routing.module';
import { DecoraDatePickerDemoComponent } from './decora-date-picker-demo.component';
import { DecDatePickerModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DecoraDatePickerDemoRoutingModule,
    DecDatePickerModule,
    DemoContainerModule,
    FormsModule,
  ],
  declarations: [DecoraDatePickerDemoComponent]
})
export class DecoraDatePickerDemoModule { }
