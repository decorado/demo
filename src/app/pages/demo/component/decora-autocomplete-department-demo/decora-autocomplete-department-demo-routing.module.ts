import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraAutocompleteDepartmentDemoComponent } from './decora-autocomplete-department-demo.component';

const routes: Routes = [
  { path: '', component: DecoraAutocompleteDepartmentDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraAutocompleteDepartmentDemoRoutingModule { }
