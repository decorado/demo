import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecLabelStatusComponent } from './dec-label-status.component';
import { DecLabelModule } from './../dec-label/dec-label.module';
import { DecStatusColorModule } from '../../services/status-color/dec-status-color.module';

@NgModule({
  imports: [
    CommonModule,
    DecLabelModule,
    DecStatusColorModule
  ],
  declarations: [DecLabelStatusComponent],
  exports: [DecLabelStatusComponent]
})
export class DecLabelStatusModule { }
