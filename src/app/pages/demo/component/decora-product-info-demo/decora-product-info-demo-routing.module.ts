import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraProductInfoDemoComponent } from './decora-product-info-demo.component';

const routes: Routes = [
  { path: '', component: DecoraProductInfoDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraProductInfoDemoRoutingModule { }
