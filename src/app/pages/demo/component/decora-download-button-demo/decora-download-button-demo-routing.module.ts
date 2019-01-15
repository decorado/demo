import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraDownloadButtonDemoComponent } from './decora-download-button-demo.component';

const routes: Routes = [
  { path: '', component: DecoraDownloadButtonDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraDownloadButtonDemoRoutingModule { }
