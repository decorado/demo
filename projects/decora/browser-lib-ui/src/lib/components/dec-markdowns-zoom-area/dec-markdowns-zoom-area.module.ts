import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecMarkdownsZoomAreaComponent } from './dec-markdowns-zoom-area.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    MatIconModule
  ],
  declarations: [
    DecMarkdownsZoomAreaComponent
  ],
  exports: [
    DecMarkdownsZoomAreaComponent
  ]
})
export class DecMarkdownsZoomAreaModule { }
