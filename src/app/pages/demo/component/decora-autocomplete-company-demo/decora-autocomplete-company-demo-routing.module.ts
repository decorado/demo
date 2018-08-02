import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteCompanyDemoComponent } from './decora-autocomplete-company-demo.component';

const routes: Routes = [
  {path: '', component: DecoraAutocompleteCompanyDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteCompanyDemoRoutingModule { }
