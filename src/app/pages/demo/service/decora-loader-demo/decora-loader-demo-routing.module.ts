import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraLoaderDemoComponent } from './decora-loader-demo.component';

const routes: Routes = [
  { path: '', component: DecoraLoaderDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraLoaderDemoRoutingModule { }
