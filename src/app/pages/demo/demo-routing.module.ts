import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'bootstrap', loadChildren: './bootstrap/decora-bootstrap.module#DecoraBootstrapModule' },
  { path: 'component', loadChildren: './component/component.module#ComponentModule' },
  { path: 'directive', loadChildren: './directive/directive.module#DirectiveModule' },
  {path: 'pipe', loadChildren: './pipe/pipe.module#PipeModule'},
  { path: 'service', loadChildren: './service/service.module#ServiceModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
