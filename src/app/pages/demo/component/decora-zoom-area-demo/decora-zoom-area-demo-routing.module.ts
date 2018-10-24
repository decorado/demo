import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraZoomAreaDemoComponent } from './decora-zoom-area-demo.component';

const routes: Routes = [
  {path: '', component: DecoraZoomAreaDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraZoomAreaDemoRoutingModule { }
