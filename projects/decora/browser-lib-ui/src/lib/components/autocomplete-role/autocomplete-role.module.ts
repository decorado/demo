import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecAutocompleteModule } from './../autocomplete/autocomplete.module';
import { DecAutocompleteRoleComponent } from './autocomplete-role.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DecAutocompleteModule
  ],
  declarations: [DecAutocompleteRoleComponent],
  exports: [DecAutocompleteRoleComponent]
})
export class DecAutocompleteRoleModule { }
