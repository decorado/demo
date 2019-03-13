import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraSuggestedTimeDemoComponent } from './decora-suggested-time-demo.component';

const routes: Routes = [
  {path: '', component: DecoraSuggestedTimeDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraSuggestedTimeDemoRoutingModule { }
