import { NgModule } from '@angular/core';
import { DecAutocompleteComponent } from './autocomplete.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatInputModule, MatButtonModule, MatIconModule, MatChipsModule } from '@angular/material';
import { DecAutocompleteOptionTemplateModule } from './dec-autocomplete-option-template/dec-autocomplete-option-template.module';

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
    DecAutocompleteOptionTemplateModule,
  ],
  declarations: [DecAutocompleteComponent],
  exports: [
    DecAutocompleteComponent,
    DecAutocompleteOptionTemplateModule
  ]
})
export class DecAutocompleteModule { }
