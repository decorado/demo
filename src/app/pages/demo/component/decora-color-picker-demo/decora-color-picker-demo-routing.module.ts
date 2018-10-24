import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraColorPickerDemoComponent } from './decora-color-picker-demo.component';

const routes: Routes = [
  { path: '', component: DecoraColorPickerDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraColorPickerDemoRoutingModule { }
