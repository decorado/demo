import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DecStringArrayInputComponent } from './dec-string-array-input.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [DecStringArrayInputComponent],
  exports: [DecStringArrayInputComponent],
})
export class DecStringArrayInputModule { }
