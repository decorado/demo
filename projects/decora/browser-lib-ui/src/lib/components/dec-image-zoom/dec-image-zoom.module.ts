import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecImageZoomComponent } from './dec-image-zoom.component';
import { DecImageModule } from './../../directives/image/image.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { DecUploadModule } from './../upload/upload.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DecImageModule,
    FlexLayoutModule,
    MatIconModule,
    TranslateModule,
    DecUploadModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [
    DecImageZoomComponent
  ],
  exports: [
    DecImageZoomComponent
  ]
})
export class DecImageZoomModule { }
