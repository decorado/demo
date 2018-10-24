import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraEventsListDemoComponent } from '@app/pages/demo/component/decora-events-list-demo/decora-events-list-demo.component';

const routes: Routes = [
  { path: '', component: DecoraEventsListDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraEventsListDemoRoutingModule { }
