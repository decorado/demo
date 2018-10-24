import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraMarkdownsZoomAreaDemoComponent } from './decora-markdowns-zoom-area-demo.component';

const routes: Routes = [
  {path: '', component: DecoraMarkdownsZoomAreaDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraMarkdownsZoomAreaDemoRoutingModule { }
