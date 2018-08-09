import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecoraImageZoomDemoComponent } from './decora-image-zoom-demo.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DecoraImageZoomDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraImageZoomDemoRoutingModule { }
