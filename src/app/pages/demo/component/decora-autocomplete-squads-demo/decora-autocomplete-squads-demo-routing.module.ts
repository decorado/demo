import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteSquadsDemoComponent } from './decora-autocomplete-squads-demo.component';

const routes: Routes = [
  {path: '', component: DecoraAutocompleteSquadsDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteSquadsDemoRoutingModule { }
