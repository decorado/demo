import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsocketDemoComponent } from './websocket-demo.component';

const routes: Routes = [
  { path: '', component: WebsocketDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsocketDemoRoutingModule { }
