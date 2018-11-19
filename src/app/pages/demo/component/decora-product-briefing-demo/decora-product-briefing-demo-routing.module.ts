import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraProductBriefingDemoComponent } from './decora-product-briefing-demo.component';

const routes: Routes = [
  {path: '', component: DecoraProductBriefingDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraProductBriefingDemoRoutingModule { }
