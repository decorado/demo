import { NgModule } from '@angular/core';
import { DecoraAutocompleteQuoteDemoComponent } from './decora-autocomplete-quote-demo.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DecoraAutocompleteQuoteDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteQuoteDemoRoutingModule { }
