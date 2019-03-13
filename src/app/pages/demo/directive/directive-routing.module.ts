import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'image', loadChildren: './decora-image-demo/decora-image-demo.module#DecoraImageDemoModule' },
  { path: 'permission', loadChildren: './decora-permission-demo/decora-permission-demo.module#DecoraPermissionDemoModule' },
  { path: 'scroll', loadChildren: './decora-scroll-demo/decora-scroll-demo.module#DecoraScrollDemoModule' },
  { path: 'contrast-font-with-bg', loadChildren: './decora-contrast-font-with-bg-demo/decora-contrast-font-with-bg-demo.module#DecoraContrastFontWithBgDemoModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectiveRoutingModule { }
