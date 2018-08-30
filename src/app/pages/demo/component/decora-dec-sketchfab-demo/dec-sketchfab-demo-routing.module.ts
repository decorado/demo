import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSketchfabDemoComponent } from './dec-sketchfab-demo.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DecSketchfabDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecSketchfabDemoRoutingModule { }
