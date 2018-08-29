import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraAutocompleteDemoRoutingModule } from './decora-autocomplete-demo-routing.module';
import { DecoraAutocompleteDemoComponent } from './decora-autocomplete-demo.component';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FormsModule } from '@angular/forms';
import { DecAutocompleteModule, DecTabsModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DemoContainerModule,
    FormsModule,
    DecAutocompleteModule,
    DecoraAutocompleteDemoRoutingModule,
    FlexLayoutModule,
    DecTabsModule,
  ],
  declarations: [DecoraAutocompleteDemoComponent]
})
export class DecoraAutocompleteDemoModule { }
