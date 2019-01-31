import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraSectionDemoRoutingModule } from './decora-section-demo-routing.module';
import { DecoraSectionDemoComponent } from './decora-section-demo.component';
import { DecSectionModule } from '@projects/decora/browser-lib-ui/src/lib/components/dec-section/dec-section.module';
import { MatButtonModule } from '@angular/material';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  declarations: [DecoraSectionDemoComponent],
  imports: [
    CommonModule,
    DecoraSectionDemoRoutingModule,
    DecSectionModule,
    MatButtonModule,
    DemoContainerModule,
  ]
})
export class DecoraSectionDemoModule { }
