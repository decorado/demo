import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecContrastFontWithBgDirective } from './dec-contrast-font-with-bg.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DecContrastFontWithBgDirective,
  ],
  exports: [
    DecContrastFontWithBgDirective,
  ]
})
export class DecContrastFontWithBgModule { }
