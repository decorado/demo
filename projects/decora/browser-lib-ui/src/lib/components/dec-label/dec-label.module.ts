import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DecLabelComponent } from './dec-label.component';
import { DecContrastFontWithBgModule } from './../../directives/color/contrast-font-with-bg/dec-contrast-font-with-bg.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DecContrastFontWithBgModule,
  ],
  declarations: [
    DecLabelComponent
  ],
  exports: [
    DecLabelComponent
  ]
})
export class DecLabelModule { }
