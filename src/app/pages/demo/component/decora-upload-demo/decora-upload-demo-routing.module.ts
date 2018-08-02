import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraUploadDemoComponent } from './decora-upload-demo.component';

const routes: Routes = [
  { path: '', component: DecoraUploadDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraUploadDemoRoutingModule { }
