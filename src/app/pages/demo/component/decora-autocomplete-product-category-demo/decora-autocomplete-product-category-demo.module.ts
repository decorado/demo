import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraAutocompleteProductCategoryDemoComponent } from './decora-autocomplete-product-category-demo.component';
import { DecoraAutocompleteProductCategoryDemoRoutingModule } from './decora-autocomplete-product-category-demo-routing.module';
import { FormsModule } from '@angular/forms';
import { DecAutocompleteProductCategoryModule } from '@projects/decora/browser-lib-ui/src/public_api';
import { DemoContainerModule } from '@app/shared/components/demo-container/demo-container.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    DecoraAutocompleteProductCategoryDemoRoutingModule,
    DecAutocompleteProductCategoryModule,
    DemoContainerModule
  ],
  declarations: [
    DecoraAutocompleteProductCategoryDemoComponent
  ],
  exports: [
    DecoraAutocompleteProductCategoryDemoComponent
  ]
})
export class DecoraAutocompleteProductCategoryDemoModule { }
