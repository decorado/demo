import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraImageDemoComponent } from './decora-image-demo.component';

const routes: Routes = [
  { path: '', component: DecoraImageDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraImageDemoRoutingModule { }
