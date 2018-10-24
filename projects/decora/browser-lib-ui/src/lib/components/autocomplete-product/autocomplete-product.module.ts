import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { DecAutocompleteProductComponent } from './autocomplete-product.component';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule,
    MatInputModule
  ],
  declarations: [
    DecAutocompleteProductComponent
  ],
  exports: [
    DecAutocompleteProductComponent
  ]
})
export class DecAutocompleteProductModule { }
