import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraBreadcrumbDemoRoutingModule } from './decora-breadcrumb-demo-routing.module';
import { DecoraBreadcrumbDemoComponent } from './decora-breadcrumb-demo.component';
import { DecBreadcrumbModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { MatButtonModule } from '@angular/material';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DecoraBreadcrumbDemoRoutingModule,
    DecBreadcrumbModule,
    MatButtonModule,
    DemoContainerModule
  ],
  declarations: [DecoraBreadcrumbDemoComponent]
})
export class DecoraBreadcrumbDemoModule { }
