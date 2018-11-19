import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DecoraJobDetailsDemoComponent } from './decora-job-details-demo.component';

const routes: Routes = [
  { path: '', component: DecoraJobDetailsDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraJobDetailsDemoRoutingModule { }
