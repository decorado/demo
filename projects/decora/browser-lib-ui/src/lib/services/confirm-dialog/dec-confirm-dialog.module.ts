import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecConfirmDialogComponent } from './dec-confirm-dialog.component';
import { DecDialogModule } from './../dialog/dec-dialog.module';
import { DecConfirmDialogService } from './dec-confirm-dialog.service';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    DecDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    TranslateModule,
  ],
  declarations: [DecConfirmDialogComponent],
  entryComponents: [DecConfirmDialogComponent],
  providers: [DecConfirmDialogService]
})
export class DecConfirmDialogModule { }
