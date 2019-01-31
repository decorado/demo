import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecScrollDirective } from './dec-scroll.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DecScrollDirective
  ],
  exports: [
    DecScrollDirective
  ]
})
export class DecScrollModule { }
