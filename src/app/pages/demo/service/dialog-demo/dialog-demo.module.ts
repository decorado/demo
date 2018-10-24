import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogDemoRoutingModule } from './dialog-demo-routing.module';
import { DialogDemoComponent } from './dialog-demo.component';
import { DecDialogModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DialogContentDemoComponentComponent } from './dialog-content-demo-component/dialog-content-demo-component.component';
import { MatButtonModule } from '@angular/material';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    DialogDemoRoutingModule,
    DecDialogModule,
    MatButtonModule,
    DemoContainerModule,
  ],
  declarations: [DialogDemoComponent, DialogContentDemoComponentComponent],
  entryComponents: [DialogContentDemoComponentComponent],
})
export class DialogDemoModule { }
