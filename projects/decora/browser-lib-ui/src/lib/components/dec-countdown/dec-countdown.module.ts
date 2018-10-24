import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecCountdownComponent } from './dec-countdown.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DecCountdownComponent],
  exports: [DecCountdownComponent]
})
export class DecCountdownModule { }
