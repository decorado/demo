import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecConfigurationDemoComponent } from './decora-config.component';

const routes: Routes = [
  {path: '', component: DecConfigurationDemoComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DecConfigurationDemoRoutingModule {
}
