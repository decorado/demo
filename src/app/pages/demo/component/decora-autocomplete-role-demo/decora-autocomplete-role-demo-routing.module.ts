import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteRoleDemoComponent } from './decora-autocomplete-role-demo.component';

const routes: Routes = [
  { path: '', component: DecoraAutocompleteRoleDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteRoleDemoRoutingModule { }
