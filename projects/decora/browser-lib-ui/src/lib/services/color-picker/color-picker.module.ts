import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerService } from './color-picker.service';
import { DecScriptLoaderModule } from './../script-loader/dec-script-loader.module';
import { DecColorServiceModule } from './../color/dec-color-service.module';

@NgModule({
  imports: [
    CommonModule,
    DecScriptLoaderModule,
    DecColorServiceModule
  ],
  providers: [ColorPickerService]
})
export class ColorPickerModule { }
