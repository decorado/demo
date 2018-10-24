import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraAutocompleteProductDemoComponent } from './decora-autocomplete-product-demo.component';
import { DecoraAutocompleteProductDemoRoutingModule } from './decora-autocomplete-product-demo-routing.module';
import { FormsModule } from '@angular/forms';
import { DecAutocompleteProductModule, DecAutocompleteCompanyModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    DecoraAutocompleteProductDemoRoutingModule,
    DecAutocompleteProductModule,
    DecAutocompleteCompanyModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraAutocompleteProductDemoComponent
  ],
  exports: [
    DecoraAutocompleteProductDemoComponent
  ]
})
export class DecoraAutocompleteProductDemoModule { }
