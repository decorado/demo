import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DecoraSketchfabViewDemoComponent } from './decora-sketchfab-view-demo.component';

const routes: Routes = [
  { path: '', component: DecoraSketchfabViewDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraSketchfabViewDemoRoutingModule { }
