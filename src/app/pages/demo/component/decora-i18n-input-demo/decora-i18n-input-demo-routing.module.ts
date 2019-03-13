import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraI18nInputDemoComponent } from './decora-i18n-input-demo.component';

const routes: Routes = [
  { path: '', component: DecoraI18nInputDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraI18nInputDemoRoutingModule { }
