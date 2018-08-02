import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraLabelDemoComponent } from './decora-label-demo.component';

const routes: Routes = [
  { path: '', component: DecoraLabelDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraLabelDemoRoutingModule { }
