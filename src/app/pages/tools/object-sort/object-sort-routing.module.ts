import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectSortComponent } from '@app/pages/tools/object-sort/object-sort.component';

const routes: Routes = [
  { path: '', component: ObjectSortComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectSortRoutingModule { }
