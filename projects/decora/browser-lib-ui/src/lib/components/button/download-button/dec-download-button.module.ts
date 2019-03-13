import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecDownloadButtonComponent } from './dec-download-button.component';
import { DecIconModule } from '../../dec-icon/dec-icon.module';
import { MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DecIconModule,
    MatButtonModule,
    TranslateModule
  ],
  declarations: [
    DecDownloadButtonComponent
  ],
  exports: [
    DecDownloadButtonComponent
  ]
})
export class DecDownloadButtonModule { }
