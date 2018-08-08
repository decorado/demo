import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraAutocompleteTagsDemoComponent } from '@app/pages/demo/component/decora-autocomplete-tags-demo/decora-autocomplete-tags-demo.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DecoraAutocompleteTagsDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteTagsDemoRoutingModule { }
