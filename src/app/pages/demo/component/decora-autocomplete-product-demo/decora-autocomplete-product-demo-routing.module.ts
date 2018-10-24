import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteProductDemoComponent } from './decora-autocomplete-product-demo.component';

const routes: Routes = [
  { path: '', component: DecoraAutocompleteProductDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteProductDemoRoutingModule { }
