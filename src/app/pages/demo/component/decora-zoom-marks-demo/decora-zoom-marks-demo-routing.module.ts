import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraZoomMarksDemoComponent } from '@app/pages/demo/component/decora-zoom-marks-demo/decora-zoom-marks-demo.component';

const routes: Routes = [
  { path: '', component: DecoraZoomMarksDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraZoomMarksDemoRoutingModule { }
