import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraBootstrapRoutingModule } from './decora-bootstrap-routing.module';
import { DecoraBootstrapComponent } from './decora-bootstrap.component';
import { MatTabsModule, MatCardModule } from '@angular/material';
import { AppearanceComponent } from './appearance/appearance.component';
import { PositioningComponent } from './positioning/positioning.component';
import { ThirdPartyComponent } from './third-party/third-party.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { OverviewComponent } from './overview/overview.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DecoraBootstrapRoutingModule,
    MatTabsModule,
    MatCardModule,
    DemoContainerModule,
    FlexLayoutModule,
  ],
  declarations: [DecoraBootstrapComponent, AppearanceComponent, PositioningComponent, ThirdPartyComponent, OverviewComponent],
  exports: [DecoraBootstrapComponent]
})
export class DecoraBootstrapModule { }
