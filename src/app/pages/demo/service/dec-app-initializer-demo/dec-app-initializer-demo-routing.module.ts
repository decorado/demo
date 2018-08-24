import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecAppInitializerDemoComponent } from './dec-app-initializer-demo.component';

const routes: Routes = [
  {path: '', component: DecAppInitializerDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecAppInitializerDemoRoutingModule { }
