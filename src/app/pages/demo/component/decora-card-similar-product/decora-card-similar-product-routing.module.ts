import { DecoraCardSimilarProductComponent } from './decora-card-similar-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DecoraCardSimilarProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraCardSimilarProductRoutingModule { }
