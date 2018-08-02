import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { DecAutocompleteProjectComponent } from './autocomplete-project.component';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule,
    MatInputModule
  ],
  declarations: [
    DecAutocompleteProjectComponent
  ],
  exports: [
    DecAutocompleteProjectComponent
  ]
})
export class DecAutocompleteProjectModule { }
