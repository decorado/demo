import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecInputTimeComponent } from './dec-input-time.component';
import { MatInputModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DecInputTimeComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [DecInputTimeComponent]
})
export class DecInputTimeModule { }
