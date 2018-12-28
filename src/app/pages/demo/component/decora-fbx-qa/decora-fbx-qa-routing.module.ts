import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraFbxQaComponent } from './decora-fbx-qa.component';

const routes: Routes = [
  { path: '', component: DecoraFbxQaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraFbxQaRoutingModule { }
