import { NgModule } from '@angular/core';
import { DecAutocompleteComponent } from './autocomplete.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule, MatChipsModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DecAutocompleteComponent],
  exports: [DecAutocompleteComponent]
})
export class DecAutocompleteModule { }
