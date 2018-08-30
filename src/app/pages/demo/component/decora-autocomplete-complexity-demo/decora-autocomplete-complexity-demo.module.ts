import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraAutocompleteComplexityDemoRoutingModule } from './decora-autocomplete-complexity-demo-routing.module';
import { DecoraAutocompleteComplexityDemoComponent } from './decora-autocomplete-complexity-demo.component';
import { AutocompleteComplexityModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DecoraAutocompleteComplexityDemoRoutingModule,
    AutocompleteComplexityModule,
    DemoContainerModule,
    FormsModule,
    MatButtonModule,
  ],
  declarations: [
    DecoraAutocompleteComplexityDemoComponent
  ],
  exports: [
    DecoraAutocompleteComplexityDemoComponent
  ]
})
export class DecoraAutocompleteComplexityDemoModule { }
