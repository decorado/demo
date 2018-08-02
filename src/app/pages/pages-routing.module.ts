import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DecPageForbidenComponent } from './../../../projects/decora/browser-lib-ui/src/public_api';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
    { path: '', loadChildren: './overview/overview.module#OverviewModule'},
    { path: 'demo', loadChildren: './demo/demo.module#DemoModule'},
    { path: 'mock-server', loadChildren: './mock-server-demo/decora-mock-server-demo.module#DecoraMockServerDemoModule' },
    { path: 'tools', loadChildren: './tools/tools.module#ToolsModule' },
    { path: 'best-practices', loadChildren: './best-practices/best-practices.module#BestPracticesModule' },
    { path: 'patterns', children: [
      { path: 'typography', loadChildren: './patterns/typography/typography.module#TypographyModule' },
      { path: 'style-guide', loadChildren: './patterns/style-guide/style-guide.module#StyleGuideModule' },
      { path: 'structure', loadChildren: './patterns/folder-structure/folder-structure.module#FolderStructureModule' },
    ]},
    { path: '**', loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule' },
    { path: 'forbiden', component: DecPageForbidenComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
