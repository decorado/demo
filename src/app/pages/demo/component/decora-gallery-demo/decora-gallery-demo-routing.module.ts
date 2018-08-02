import { NgModule } from '@angular/core';
import { DecoraGalleryDemoComponent } from './..//decora-gallery-demo/decora-gallery-demo.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DecoraGalleryDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraGalleryDemoRoutingModule { }
