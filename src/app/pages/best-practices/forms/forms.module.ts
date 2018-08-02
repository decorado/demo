import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsBestPracticesRoutingModule } from './forms-routing.module';
import { FormsBestPracticesComponent } from './forms.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsBestPracticesRoutingModule,
    DemoContainerModule,
    MatSelectModule,
  ],
  declarations: [
    FormsBestPracticesComponent
  ]
})
export class FormsBestPracticesModule { }
