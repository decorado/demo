import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmDialogDemoComponent } from './confirm-dialog-demo.component';

const routes: Routes = [
  {path: '', component: ConfirmDialogDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmDialogDemoRoutingModule { }
