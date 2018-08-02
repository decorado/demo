import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteDemoComponent } from './decora-autocomplete-demo.component';

const routes: Routes = [
  { path: '', component: DecoraAutocompleteDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteDemoRoutingModule { }
