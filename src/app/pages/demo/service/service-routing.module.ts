import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'api', loadChildren: './decora-api-demo/decora-api.module#DecApiDemoModule' },
  { path: 'config', loadChildren: './decora-config-demo/decora-config.module#DecConfigurationDemoModule' },
  { path: 'initializer', loadChildren: './dec-app-initializer-demo/dec-app-initializer-demo.module#DecAppInitializerDemoModule' },
  { path: 'permission-guard', loadChildren: './decora-permission-guard-demo/decora-permission-guard-demo.module#DecoraPermissionGuardDemoModule' },
  { path: 'snack-bar', loadChildren: './decora-snack-bar-demo/decora-snack-bar-demo.module#DecoraSnackBarDemoModule' },
  { path: 'websocket', loadChildren: './websocket/websocket-demo.module#DecoraWebsocketDemoModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
