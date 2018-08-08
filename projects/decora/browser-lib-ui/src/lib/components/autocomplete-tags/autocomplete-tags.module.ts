import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteTagsComponent } from './autocomplete-tags.component';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule
  ],
  declarations: [
    AutocompleteTagsComponent
  ],
  exports: [
    AutocompleteTagsComponent
  ]
})
export class AutocompleteTagsModule { }
