import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavDemoComponent } from './sidenav-demo.component';

const routes: Routes = [
  { path: '', component: SidenavDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavDemoRoutingModule { }
