import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentStylesComponent } from '@app/pages/best-practices/component-styles/component-styles.component';

const routes: Routes = [
  { path: '', component: ComponentStylesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentStylesRoutingModule { }
