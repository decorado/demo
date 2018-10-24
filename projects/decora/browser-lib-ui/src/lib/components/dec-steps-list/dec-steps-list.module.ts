import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecStepsListComponent } from './dec-steps-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { DecIconModule } from './../dec-icon/dec-icon.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    DecIconModule,
  ],
  declarations: [DecStepsListComponent],
  exports: [DecStepsListComponent],
})
export class DecStepsListModule { }
