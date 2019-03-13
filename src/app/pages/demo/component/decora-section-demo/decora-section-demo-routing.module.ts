import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraSectionDemoComponent } from './decora-section-demo.component';

const routes: Routes = [
  { path: '', component: DecoraSectionDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraSectionDemoRoutingModule { }
