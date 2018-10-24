import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogDemoRoutingModule } from './confirm-dialog-demo-routing.module';
import { ConfirmDialogDemoComponent } from './confirm-dialog-demo.component';
import { DecConfirmDialogModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { MatButtonModule } from '@angular/material';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogDemoRoutingModule,
    DecConfirmDialogModule,
    MatButtonModule,
    DemoContainerModule,
  ],
  declarations: [ConfirmDialogDemoComponent]
})
export class ConfirmDialogDemoModule { }
