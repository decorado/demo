import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecSnackBarService } from './dec-snack-bar.service';
import { MatSnackBarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    TranslateModule
  ],
  providers: [
    DecSnackBarService
  ]
})
export class DecSnackBarModule { }
