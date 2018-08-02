import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecApiComponent } from './decora-api.component';


const routes: Routes = [
  {path: '', component: DecApiComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DecApiRoutingModule {
}
