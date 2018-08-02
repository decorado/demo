import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageForbidenDemoRoutingModule } from './page-forbiden-demo-routing.module';
import { PageForbidenDemoComponent } from './page-forbiden-demo.component';
import { DecPageForbidenModule } from '@projects/decora/browser-lib-ui/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    PageForbidenDemoRoutingModule,
    DecPageForbidenModule
  ],
  declarations: [PageForbidenDemoComponent]
})
export class PageForbidenDemoModule { }
