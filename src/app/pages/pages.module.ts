import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DecSidenavModule, DecPageForbidenModule, DecPermissionModule, DecIconModule } from './../../../projects/decora/browser-lib-ui/src/public_api';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    DecSidenavModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    DecPageForbidenModule,
    DecPermissionModule,
    DecIconModule
  ],
  declarations: [PagesComponent]
})
export class PagesModule { }
