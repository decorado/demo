import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteAccountDemoComponent } from './decora-autocomplete-account-demo.component';

const routes: Routes = [
  { path: '', component: DecoraAutocompleteAccountDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteAccountDemoRoutingModule { }
