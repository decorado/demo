import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraListDemoComponent } from './decora-list-demo.component';

const routes: Routes = [
  { path: '', component: DecoraListDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraListDemoRoutingModule { }
