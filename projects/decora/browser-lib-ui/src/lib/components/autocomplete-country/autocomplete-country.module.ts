import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { DecAutocompleteCountryComponent } from './autocomplete-country.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule,
  ],
  declarations: [DecAutocompleteCountryComponent],
  exports: [DecAutocompleteCountryComponent]
})
export class DecAutocompleteCountryModule { }
