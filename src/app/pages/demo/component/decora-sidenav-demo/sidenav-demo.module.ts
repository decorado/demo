import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavDemoRoutingModule } from './sidenav-demo-routing.module';
import { SidenavDemoComponent } from './sidenav-demo.component';
import { DecSidenavModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { MatButtonModule } from '@angular/material';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    SidenavDemoRoutingModule,
    DecSidenavModule,
    MatButtonModule,
    DemoContainerModule,
  ],
  declarations: [SidenavDemoComponent]
})
export class SidenavDemoModule { }
