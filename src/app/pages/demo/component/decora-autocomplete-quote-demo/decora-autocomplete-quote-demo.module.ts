import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraAutocompleteQuoteDemoComponent } from './decora-autocomplete-quote-demo.component';
import { DecoraAutocompleteQuoteDemoRoutingModule } from './decora-autocomplete-quote-demo-routing.module';
import { DecAutocompleteQuoteModule, DecAutocompleteProjectModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { FormsModule } from '@angular/forms';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    DecoraAutocompleteQuoteDemoRoutingModule,
    DecAutocompleteQuoteModule,
    DecAutocompleteProjectModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraAutocompleteQuoteDemoComponent
  ],
  exports: [
    DecoraAutocompleteQuoteDemoComponent
  ]
})
export class DecoraAutocompleteQuoteDemoModule { }
