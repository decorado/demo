import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteComplexityDemoComponent } from './decora-autocomplete-complexity-demo.component';

const routes: Routes = [
  {path: '', component: DecoraAutocompleteComplexityDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteComplexityDemoRoutingModule { }
