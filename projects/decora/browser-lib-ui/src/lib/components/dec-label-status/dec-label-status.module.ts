import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecLabelStatusComponent } from './dec-label-status.component';
import { DecLabelModule } from './../dec-label/dec-label.module';
import { DecColorServiceModule } from './../../services/color/dec-color-service.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DecLabelModule,
    DecColorServiceModule,
    TranslateModule
  ],
  declarations: [DecLabelStatusComponent],
  exports: [DecLabelStatusComponent]
})
export class DecLabelStatusModule { }
