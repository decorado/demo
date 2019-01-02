import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraInputTimeDemoComponent } from './decora-input-time-demo.component';

const routes: Routes = [
  { path: '', component: DecoraInputTimeDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraInputTimeDemoRoutingModule { }
