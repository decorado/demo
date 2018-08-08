import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecScriptLoaderService } from './dec-script-loader.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DecScriptLoaderService
  ]
})
export class DecScriptLoaderModule { }
