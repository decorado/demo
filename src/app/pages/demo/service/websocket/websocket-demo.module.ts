import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsocketDemoRoutingModule } from './websocket-demo-routing.module';
import { WebsocketDemoComponent } from './websocket-demo.component';
import { DecWsClientModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';

@NgModule({
  imports: [
    CommonModule,
    WebsocketDemoRoutingModule,
    DecWsClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    DemoContainerModule,
  ],
  declarations: [WebsocketDemoComponent]
})
export class DecoraWebsocketDemoModule { }
