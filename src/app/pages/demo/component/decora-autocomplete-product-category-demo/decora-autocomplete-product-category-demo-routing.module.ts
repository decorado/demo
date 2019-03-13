import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteProductCategoryDemoComponent } from './decora-autocomplete-product-category-demo.component';

const routes: Routes = [
  { path: '', component: DecoraAutocompleteProductCategoryDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteProductCategoryDemoRoutingModule { }
