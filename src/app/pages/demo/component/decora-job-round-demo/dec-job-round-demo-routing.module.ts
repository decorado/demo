import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecJobRoundDemoComponent } from './dec-job-round-demo.component';

const routes: Routes = [
  {path: '', component: DecJobRoundDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecJobRoundDemoRoutingModule { }
