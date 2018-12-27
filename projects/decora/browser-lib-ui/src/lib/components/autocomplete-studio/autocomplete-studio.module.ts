import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { AutocompleteStudioComponent } from './autocomplete-studio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule
  ],
  declarations: [
    AutocompleteStudioComponent
  ],
  exports: [
    AutocompleteStudioComponent
  ]
})
export class AutocompleteStudioModule { }
