import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecConfirmDialogComponent } from './dec-confirm-dialog.component';
import { DecDialogModule } from './../dialog/dec-dialog.module';
import { DecConfirmDialogService } from './dec-confirm-dialog.service';
@NgModule({
  imports: [
    CommonModule,
    DecDialogModule,
  ],
  declarations: [DecConfirmDialogComponent],
  entryComponents: [DecConfirmDialogComponent],
  providers: [DecConfirmDialogService]
})
export class DecConfirmDialogModule { }
