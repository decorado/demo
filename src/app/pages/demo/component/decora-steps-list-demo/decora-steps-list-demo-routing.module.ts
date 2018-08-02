import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraStepsListDemoComponent } from './decora-steps-list-demo.component';

const routes: Routes = [
  { path: '', component: DecoraStepsListDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraStepsListDemoRoutingModule { }
