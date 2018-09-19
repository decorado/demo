import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecLoaderService } from './dec-loader.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    DecLoaderService
  ]
})
export class DecLoaderModule { }
