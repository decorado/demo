import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { DecAutocompleteProductCategoryComponent } from './autocomplete-product-category.component';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule,
    MatInputModule
  ],
  declarations: [
    DecAutocompleteProductCategoryComponent
  ],
  exports: [
    DecAutocompleteProductCategoryComponent
  ]
})
export class DecAutocompleteProductCategoryModule { }
