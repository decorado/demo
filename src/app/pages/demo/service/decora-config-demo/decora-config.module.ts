import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecConfigurationDemoComponent } from './decora-config.component';
import { DecConfigurationDemoRoutingModule } from './decora-config-routing.module';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { PrettyJsonModule } from 'angular2-prettyjson';

@NgModule({
  imports: [
    CommonModule,
    DecConfigurationDemoRoutingModule,
    DemoContainerModule,
    PrettyJsonModule,
  ],
  declarations: [DecConfigurationDemoComponent]
})
export class DecConfigurationDemoModule { }
