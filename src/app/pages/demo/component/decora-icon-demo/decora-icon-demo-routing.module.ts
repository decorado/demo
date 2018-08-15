import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraIconDemoComponent } from '@app/pages/demo/component/decora-icon-demo/decora-icon-demo.component';

const routes: Routes = [
  {path: '', component: DecoraIconDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraIconDemoRoutingModule { }
