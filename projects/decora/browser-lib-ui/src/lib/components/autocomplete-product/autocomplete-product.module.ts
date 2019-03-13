import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { DecAutocompleteProductComponent } from './autocomplete-product.component';
import { MatInputModule } from '@angular/material';
import { DecImageModule } from './../../directives/image/image.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule,
    MatInputModule,
    DecImageModule,
    FlexLayoutModule,
  ],
  declarations: [
    DecAutocompleteProductComponent
  ],
  exports: [
    DecAutocompleteProductComponent
  ]
})
export class DecAutocompleteProductModule { }
