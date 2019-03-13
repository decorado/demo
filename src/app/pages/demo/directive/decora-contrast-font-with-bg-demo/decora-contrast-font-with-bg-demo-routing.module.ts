import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraContrastFontWithBgDemoComponent } from './decora-contrast-font-with-bg-demo.component';

const routes: Routes = [
  { path: '', component: DecoraContrastFontWithBgDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraContrastFontWithBgDemoRoutingModule { }
