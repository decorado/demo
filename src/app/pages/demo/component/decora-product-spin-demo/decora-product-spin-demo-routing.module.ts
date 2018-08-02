import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraProductSpinDemoComponent } from "./decora-product-spin-demo.component";

const routes: Routes = [
  { path: '', component: DecoraProductSpinDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraProductSpinDemoRoutingModule { }
