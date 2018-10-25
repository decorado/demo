import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraDatePickerDemoComponent } from './decora-date-picker-demo.component';

const routes: Routes = [
  { path: '', component: DecoraDatePickerDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraDatePickerDemoRoutingModule { }
