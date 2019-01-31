import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraCountdownDemoComponent } from './decora-countdown-demo.component';

const routes: Routes = [
  { path: '', component: DecoraCountdownDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraCountdownDemoRoutingModule { }
