import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraCategoryDemoComponent } from './decora-category-demo.component';

const routes: Routes = [
  { path: '', component: DecoraCategoryDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraCategoryDemoRoutingModule { }
