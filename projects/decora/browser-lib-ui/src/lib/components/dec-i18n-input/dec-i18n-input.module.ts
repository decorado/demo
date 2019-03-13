import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecI18nInputComponent } from './dec-i18n-input.component';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DecI18nInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [DecI18nInputComponent]
})
export class DecI18nInputModule { }
