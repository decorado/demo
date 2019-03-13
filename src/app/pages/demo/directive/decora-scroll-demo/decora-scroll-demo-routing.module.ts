import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraScrollDemoComponent } from './decora-scroll-demo.component';

const routes: Routes = [
  {path: '', component: DecoraScrollDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraScrollDemoRoutingModule { }
