import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresentationComponentsComponent } from '@app/pages/best-practices/presentation-components/presentation-components.component';

const routes: Routes = [
  { path: '', component: PresentationComponentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationComponentsRoutingModule { }
