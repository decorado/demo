import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraSnackBarDemoComponent } from './decora-snack-bar-demo.component';

const routes: Routes = [
  { path: '', component: DecoraSnackBarDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraSnackBarDemoRoutingModule { }
