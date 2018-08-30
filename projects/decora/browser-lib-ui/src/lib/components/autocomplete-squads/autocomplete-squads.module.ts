import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { FormsModule } from '@angular/forms';
import { AutocompleteSquadsComponent } from './autocomplete-squads.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule
  ],
  declarations: [
    AutocompleteSquadsComponent
  ],
  exports: [
    AutocompleteSquadsComponent
  ]
})
export class AutocompleteSquadsModule { }
