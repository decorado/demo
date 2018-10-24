import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraRenderCommentComponent } from './decora-render-comment.component';

const routes: Routes = [
  { path: '', component: DecoraRenderCommentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraRenderCommentRoutingModule { }
