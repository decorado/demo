import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraStepsListDemoRoutingModule } from './decora-steps-list-demo-routing.module';
import { DecoraStepsListDemoComponent } from './decora-steps-list-demo.component';
import { DecStepsListModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { TranslateModule } from '@ngx-translate/core';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DecoraStepsListDemoRoutingModule,
    DecStepsListModule,
    TranslateModule,
    FlexLayoutModule,
    DemoContainerModule,
  ],
  declarations: [DecoraStepsListDemoComponent]
})
export class DecoraStepsListDemoModule { }
