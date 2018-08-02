import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraMockServerDemoComponent } from './decora-mock-server-demo.component';

const routes: Routes = [
  { path: '', component: DecoraMockServerDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraMockServerDemoRoutingModule { }
