import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoraAutocompleteCountryDemoRoutingModule } from './decora-autocomplete-country-demo-routing.module';
import { DecoraAutocompleteCountryDemoComponent } from './decora-autocomplete-country-demo.component';
import { DecAutocompleteCountryModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DecoraAutocompleteCountryDemoRoutingModule,
    DecAutocompleteCountryModule,
    DemoContainerModule,
    FormsModule,
  ],
  declarations: [DecoraAutocompleteCountryDemoComponent]
})
export class DecoraAutocompleteCountryDemoModule { }
