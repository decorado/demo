import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'image', loadChildren: './decora-image-demo/decora-image-demo.module#DecoraImageDemoModule' },
  { path: 'permission', loadChildren: './decora-permission-demo/decora-permission-demo.module#DecoraPermissionDemoModule' },
  { path: 'scroll', loadChildren: './decora-scroll-demo/decora-scroll-demo.module#DecoraScrollDemoModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectiveRoutingModule { }
