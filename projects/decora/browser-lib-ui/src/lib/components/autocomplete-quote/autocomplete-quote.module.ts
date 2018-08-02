import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { DecAutocompleteQuoteComponent } from './autocomplete-quote.component';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule,
    MatInputModule
  ],
  declarations: [
    DecAutocompleteQuoteComponent
  ],
  exports: [
    DecAutocompleteQuoteComponent
  ]
})
export class DecAutocompleteQuoteModule { }
