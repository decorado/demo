import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { FormsModule } from '@angular/forms';
import { AutocompleteComplexityComponent } from './autocomplete-complexity.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule
  ],
  declarations: [
    AutocompleteComplexityComponent
  ],
  exports: [
    AutocompleteComplexityComponent
  ]
})
export class AutocompleteComplexityModule { }
