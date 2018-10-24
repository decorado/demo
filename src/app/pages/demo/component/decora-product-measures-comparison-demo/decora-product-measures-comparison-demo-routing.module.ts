import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraProductMeasuresComparisonDemoComponent } from './decora-product-measures-comparison-demo.component';

const routes: Routes = [
  {path: '', component: DecoraProductMeasuresComparisonDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraProductMeasuresComparisonDemoRoutingModule { }
