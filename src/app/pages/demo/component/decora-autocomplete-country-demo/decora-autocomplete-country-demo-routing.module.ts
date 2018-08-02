import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteCountryDemoComponent } from './decora-autocomplete-country-demo.component';

const routes: Routes = [
  {path: '', component: DecoraAutocompleteCountryDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteCountryDemoRoutingModule { }
