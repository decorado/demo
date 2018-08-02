import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { DecAutocompleteCompanyComponent } from './autocomplete-company.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule,
  ],
  declarations: [DecAutocompleteCompanyComponent],
  exports: [DecAutocompleteCompanyComponent]
})
export class DecAutocompleteCompanyModule { }
