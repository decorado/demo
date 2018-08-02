import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteProjectDemoComponent } from './decora-autocomplete-project-demo.component';

const routes: Routes = [
  { path: '', component: DecoraAutocompleteProjectDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteProjectDemoRoutingModule { }
