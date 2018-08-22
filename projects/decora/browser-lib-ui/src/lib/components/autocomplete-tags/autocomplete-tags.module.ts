import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecAutocompleteTagsComponent } from './autocomplete-tags.component';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule
  ],
  declarations: [
    DecAutocompleteTagsComponent
  ],
  exports: [
    DecAutocompleteTagsComponent
  ]
})
export class DecAutocompleteTagsModule { }
