import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecoraCarouselDemoComponent } from './decora-carousel-demo.component';

const routes: Routes = [
  {path: '', component: DecoraCarouselDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoraCarouselDemoRoutingModule { }
