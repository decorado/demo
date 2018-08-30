import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraImageMarksDemoComponent } from '@app/pages/demo/component/decora-image-marks-demo/decora-image-marks-demo.component';

const routes: Routes = [
  { path: '', component: DecoraImageMarksDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraImageMarksDemoRoutingModule { }
