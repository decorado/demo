import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecAppInitializerDemoRoutingModule } from './dec-app-initializer-demo-routing.module';
import { DecAppInitializerDemoComponent } from './dec-app-initializer-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DecAppInitializerDemoRoutingModule,
    DemoContainerModule,
  ],
  declarations: [DecAppInitializerDemoComponent]
})
export class DecAppInitializerDemoModule { }
