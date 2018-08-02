import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraTabsDemoComponent } from './decora-tabs-demo.component';

const routes: Routes = [
  { path: '', component: DecoraTabsDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraTabsDemoRoutingModule { }
