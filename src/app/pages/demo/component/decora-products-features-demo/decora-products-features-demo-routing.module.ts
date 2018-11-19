import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraProductsFeaturesDemoComponent } from './decora-products-features-demo.component';

const routes: Routes = [
  { path: '', component: DecoraProductsFeaturesDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraProductsFeaturesDemoRoutingModule { }
