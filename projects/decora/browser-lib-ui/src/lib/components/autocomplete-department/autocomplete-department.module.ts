import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { DecAutocompleteDepartmentComponent } from './autocomplete-department.component';
import { MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule,
    MatInputModule
  ],
  declarations: [DecAutocompleteDepartmentComponent],
  exports: [DecAutocompleteDepartmentComponent]
})
export class DecAutocompleteDepartmentModule { }
