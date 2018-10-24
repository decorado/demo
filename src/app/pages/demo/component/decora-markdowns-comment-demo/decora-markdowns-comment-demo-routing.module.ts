import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraMarkdownsCommentDemoComponent } from './decora-markdowns-comment-demo.component';

const routes: Routes = [
  {path: '', component: DecoraMarkdownsCommentDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraMarkdownsCommentDemoRoutingModule { }
