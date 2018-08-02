import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraBreadcrumbDemoComponent } from './decora-breadcrumb-demo.component';

const routes: Routes = [
  { path: '', component: DecoraBreadcrumbDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraBreadcrumbDemoRoutingModule { }
