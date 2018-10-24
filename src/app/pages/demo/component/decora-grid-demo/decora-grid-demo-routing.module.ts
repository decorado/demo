import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraGridDemoComponent } from '@app/pages/demo/component/decora-grid-demo/decora-grid-demo.component';

const routes: Routes = [
  { path: '', component: DecoraGridDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraGridDemoRoutingModule { }
