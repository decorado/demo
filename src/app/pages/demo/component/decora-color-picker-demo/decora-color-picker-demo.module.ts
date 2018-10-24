import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraColorPickerDemoRoutingModule } from './decora-color-picker-demo-routing.module';
import { DecoraColorPickerDemoComponent } from './decora-color-picker-demo.component';
import { DecColorPickerModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DecoraColorPickerDemoRoutingModule,
    DemoContainerModule,
    DecColorPickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [DecoraColorPickerDemoComponent]
})
export class DecoraColorPickerDemoModule { }
