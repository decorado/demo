import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecImageZoomComponent } from './dec-image-zoom.component';
import { DecImageModule } from './../../directives/image/image.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DecImageModule,
    FlexLayoutModule,
    MatIconModule,
    TranslateModule
  ],
  declarations: [
    DecImageZoomComponent
  ],
  exports: [
    DecImageZoomComponent
  ]
})
export class DecImageZoomModule { }
