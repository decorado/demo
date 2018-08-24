import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraListDemoRoutingModule } from './decora-list-demo-routing.module';
import { DecoraListDemoComponent } from './decora-list-demo.component';
import { DecListModule, DecAutocompleteCompanyModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DemoContainerModule,
    DecoraListDemoRoutingModule,
    DecListModule,
    TranslateModule,
    FlexLayoutModule,
    MatExpansionModule,
    DecAutocompleteCompanyModule,
  ],
  declarations: [DecoraListDemoComponent]
})
export class DecoraListDemoModule { }
