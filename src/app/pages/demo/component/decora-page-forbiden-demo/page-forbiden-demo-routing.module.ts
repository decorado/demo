import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageForbidenDemoComponent } from './page-forbiden-demo.component';

const routes: Routes = [
  {path: '', component: PageForbidenDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageForbidenDemoRoutingModule { }
