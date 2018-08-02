import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsBestPracticesComponent } from '@app/pages/best-practices/forms/forms.component';

const routes: Routes = [
  { path: '', component: FormsBestPracticesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsBestPracticesRoutingModule { }
