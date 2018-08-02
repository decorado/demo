import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DecSpinnerModule } from './../dec-spinner/dec-spinner.module';

import { DecDialogComponent } from './dec-dialog.component';
import { DecDialogService } from './dec-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FlexLayoutModule,
    DecSpinnerModule,
    TranslateModule,
  ],
  declarations: [DecDialogComponent],
  entryComponents: [DecDialogComponent],
  providers: [DecDialogService],
})
export class DecDialogModule { }
