import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraPermissionGuardDemoComponent } from './decora-permission-guard-demo.component';
import { DecPermissionGuard } from '@projects/decora/browser-lib-ui/src/public_api';

const routes: Routes = [
  {
    path: '', component: DecoraPermissionGuardDemoComponent,
    canActivate: [DecPermissionGuard],
    data: { permissions: ['admin.users.clienteditor.view'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraPermissionGuardDemoRoutingModule { }
