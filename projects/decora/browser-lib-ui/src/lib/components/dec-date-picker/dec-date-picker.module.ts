import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecDatePickerComponent } from './dec-date-picker.component';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule,
  ],
  declarations: [DecDatePickerComponent],
  exports: [DecDatePickerComponent]
})
export class DecDatePickerModule { }
