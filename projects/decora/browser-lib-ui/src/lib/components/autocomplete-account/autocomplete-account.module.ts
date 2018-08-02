import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { DecAutocompleteAccountComponent } from './autocomplete-account.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule,
  ],
  declarations: [DecAutocompleteAccountComponent],
  exports: [DecAutocompleteAccountComponent]
})
export class DecAutocompleteAccountModule { }
