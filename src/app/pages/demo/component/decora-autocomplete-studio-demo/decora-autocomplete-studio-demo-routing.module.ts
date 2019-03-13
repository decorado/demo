import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteStudioDemoComponent } from './decora-autocomplete-studio-demo.component';

const routes: Routes = [
  {path: '', component: DecoraAutocompleteStudioDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteStudioDemoRoutingModule { }
